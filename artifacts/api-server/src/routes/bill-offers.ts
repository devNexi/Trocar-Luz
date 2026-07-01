import { Router, type IRouter } from "express";
import { rateLimit } from "express-rate-limit";
import { and, eq } from "drizzle-orm";
import { db, gdOffersTable } from "@workspace/db";
import { GetBillOffersBody } from "@workspace/api-zod";
import { computeEstimate } from "../lib/savings-estimate";
import { parseBillFile } from "../lib/parser-client";
import { createOfferSession } from "../lib/offer-session-store";
import { sendUnreadableBillNotification } from "../lib/email";
import { ObjectStorageService, ObjectNotFoundError } from "../lib/objectStorage";

const router: IRouter = Router();
const objectStorageService = new ObjectStorageService();

const billOffersLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Muitas solicitações. Tente novamente em 1 minuto." },
});

const AVG_TARIFF_BRL_KWH = 0.85;

function tipoClienteMatches(tipoCliente: string, customerType: string): boolean {
  const t = tipoCliente.toLowerCase();
  if (customerType === "residential") return t.includes("residencial");
  return t.includes("comercial") || t.includes("grupo a");
}

router.post("/bill-offers", billOffersLimiter, async (req, res): Promise<void> => {
  const parsed = GetBillOffersBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { billObjectPath, state, customerType, distributor, monthlyBillValue } = parsed.data;
  const uf = state.toUpperCase();

  // ── Bill-upload path ────────────────────────────────────────────────────────
  if (billObjectPath) {
    let parseResult = null;

    try {
      const file = await objectStorageService.getObjectEntityFile(billObjectPath);
      const [buffer] = await file.download();
      const [metadata] = await file.getMetadata();
      const contentType = String(metadata.contentType ?? "application/pdf");
      parseResult = await parseBillFile(Buffer.from(buffer), contentType, "conta-de-luz.pdf");
    } catch (err) {
      if (err instanceof ObjectNotFoundError) {
        req.log.warn({ billObjectPath }, "Bill file not found in storage");
      } else {
        req.log.error({ err }, "Error reading bill file from storage");
      }
    }

    const isReadable =
      parseResult?.ok === true &&
      parseResult.confidence !== "unreadable" &&
      parseResult.confidence !== "low" &&
      parseResult.consumoKwh != null &&
      parseResult.consumoKwh > 0;

    if (isReadable && parseResult) {
      const allOffers = await db
        .select()
        .from(gdOffersTable)
        .where(and(eq(gdOffersTable.uf, uf), eq(gdOffersTable.status, "Disponível")));

      let pool = allOffers.filter((o) => tipoClienteMatches(o.tipoCliente, customerType));
      if (pool.length === 0) pool = allOffers;

      const resolvedDistributor = parseResult.distribuidora ?? distributor;
      if (resolvedDistributor) {
        const distLower = resolvedDistributor.toLowerCase();
        const distPool = pool.filter(
          (o) =>
            o.distribuidora.toLowerCase().includes(distLower) ||
            distLower.includes(o.distribuidora.toLowerCase())
        );
        if (distPool.length > 0) pool = distPool;
      }

      const parsedKwh = parseResult.consumoKwh!;
      const eligible = pool.filter(
        (o) => o.ticketMinimoKwh === null || o.ticketMinimoKwh <= parsedKwh
      );

      if (eligible.length > 0) {
        const billValue =
          parseResult.valorTotal ??
          monthlyBillValue ??
          Math.round(parsedKwh * AVG_TARIFF_BRL_KWH);

        const sorted = eligible
          .filter((o) => o.discountMax !== null)
          .sort((a, b) => (b.discountMax ?? 0) - (a.discountMax ?? 0));

        const top = sorted.slice(0, 3);

        const { sessionId, options } = createOfferSession({
          parsedKwh,
          parsedDistribuidora: parseResult.distribuidora,
          parsedGrupo: parseResult.grupoTarifario,
          billValue,
          pii: parseResult.pii,
          offers: top.map((o) => ({
            gdOfferId: o.id,
            discountPct: o.discountMax ?? 0,
            savingsBrl: Math.round(((o.discountMax ?? 0) * billValue) / 100),
            fidelidade: o.fidelidade || "Sem fidelidade",
          })),
        });

        req.log.info(
          { uf, optionsCount: options.length, parsedKwh, confidence: parseResult.confidence },
          "Real GD offers generated from parsed bill"
        );

        // HARD RULE: response contains ONLY opaque optionIds, labels, and discount/savings figures.
        // NO partner/comercializadora name, NO stable partner id, NO customer PII flows to the client.
        res.json({
          mode: "real_offers",
          sessionId,
          options,
          parsedKwh,
          parsedDistribuidora: parseResult.distribuidora,
        });
        return;
      }

      req.log.info(
        { uf, parsedKwh, parsedDistribuidora: parseResult.distribuidora },
        "Bill parsed — no eligible Disponível offers, falling back to estimate"
      );
    } else {
      void sendUnreadableBillNotification({
        state: uf,
        distributor: distributor ?? null,
        customerType,
        billObjectPath,
        confidence: parseResult?.confidence ?? "unreadable",
        errorReason:
          parseResult?.ok === false ? "Parser error or timeout" : "Low confidence / no kWh",
      });

      req.log.warn(
        { uf, confidence: parseResult?.confidence, billObjectPath },
        "Bill unreadable or low confidence — falling back to estimate"
      );
    }
  }

  // ── Fallback / no-upload: estimate path ─────────────────────────────────────
  const bill = monthlyBillValue ?? 0;
  if (bill <= 0) {
    res.json({
      mode: "estimate",
      eligible: false,
      discountMin: 0,
      discountMax: 0,
      savingsMinBrl: 0,
      savingsMaxBrl: 0,
      nextStep: "join_waitlist",
      disclaimer: "Informe o valor da sua conta para obter uma estimativa.",
      partnerAvailable: false,
      coverageStatus: "no_coverage",
    });
    return;
  }

  const estimate = await computeEstimate({
    state: uf,
    distributor: distributor ?? undefined,
    monthlyBillValue: bill,
    customerType,
  });

  const { comercializadoras: _stripped, ...clientEstimate } = estimate;

  req.log.info({ uf, eligible: estimate.eligible }, "Bill offers route returned estimate");

  res.json({ mode: "estimate", ...clientEstimate });
});

export default router;

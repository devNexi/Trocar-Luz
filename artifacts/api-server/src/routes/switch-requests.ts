import { Router, type IRouter } from "express";
import { rateLimit } from "express-rate-limit";
import { nanoid } from "nanoid";
import { db, switchRequestsTable, switchRequestEventsTable, partnersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { GetSavingsEstimateBody, CreateSwitchRequestBody } from "@workspace/api-zod";
import { computeEstimate } from "../lib/savings-estimate";
import { sendConfirmationTemplate } from "../lib/whatsapp";
import { fireIntegrationHook } from "../lib/integration-hook";

const router: IRouter = Router();

const estimateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Muitas solicitações. Tente novamente em 1 minuto." },
});

// Per-IP: 5 requests per minute
const switchRequestPerIpLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Muitas solicitações. Tente novamente em 1 minuto." },
});

// Global: 1000 requests per hour across ALL IPs (blast / launch protection)
const switchRequestGlobalLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 1000,
  keyGenerator: () => "global",
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Serviço temporariamente sobrecarregado. Tente novamente em instantes." },
});

function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    SWITCH_REQUEST_SUBMITTED: "Solicitação recebida",
    AUTO_ELIGIBILITY_CHECK: "Verificando elegibilidade",
    SENT_TO_GD_PARTNER: "Enviada ao parceiro GD",
    PARTNER_REVIEWING: "Parceiro analisando",
    PARTNER_PROPOSAL_RECEIVED: "Proposta recebida do parceiro",
    PROPOSAL_SENT_TO_CUSTOMER: "Proposta enviada para você",
    CUSTOMER_ACCEPTED: "Proposta aceita",
    CUSTOMER_DECLINED: "Proposta recusada",
    PROPOSAL_EXPIRED: "Proposta expirada",
    REVALIDATION_REQUIRED: "Revalidação necessária",
    DOCUMENTS_REQUESTED: "Documentos solicitados",
    CONTRACTING: "Em contratação",
    SWITCHED_CLOSED_WON: "Migração concluída",
    REJECTED_NOT_ELIGIBLE: "Não elegível no momento",
    WAITLIST: "Na lista de espera",
  };
  return labels[status] ?? status;
}

// PERMANENT RULE — NEVER expose partner/comercializadora identity in this response.
// Partner identity is core broker IP. Customers must not see who supplies their discount
// until a deal is committed (after they submit their bill and we proceed internally).
// This is enforced by destructuring comercializadoras out before res.json().
// It is retained in `result` for server-side logging and routing only.
router.post("/savings-estimate", estimateLimiter, async (req, res): Promise<void> => {
  const parsed = GetSavingsEstimateBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const result = await computeEstimate({
    state: parsed.data.state,
    distributor: parsed.data.distributor ?? undefined,
    monthlyBillValue: parsed.data.monthlyBillValue,
    customerType: parsed.data.customerType,
    hasEv: parsed.data.hasEv ?? undefined,
  });

  req.log.info(
    { state: parsed.data.state, eligible: result.eligible, partnerCount: result.comercializadoras.length },
    "Savings estimate computed"
  );

  // Strip partner identity from the client response — server-side only
  const { comercializadoras: _stripped, ...clientResult } = result;
  res.json(clientResult);
});

router.post("/switch-requests", switchRequestGlobalLimiter, switchRequestPerIpLimiter, async (req, res): Promise<void> => {
  // Honeypot: bots fill hidden fields, real users never do
  if (req.body._trap) {
    req.log.warn({ ip: req.ip }, "Honeypot triggered — bot submission silently dropped");
    res.status(201).json({ publicId: "ok", status: "ok", statusLabel: "ok", trackingUrl: "/" });
    return;
  }

  const parsed = CreateSwitchRequestBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;

  if (!data.lgpdConsent || !data.partnerShareConsent || !data.whatsappConsent) {
    res.status(400).json({ error: "Todos os consentimentos são obrigatórios." });
    return;
  }

  // Partner matching by state
  const partners = await db
    .select()
    .from(partnersTable)
    .where(eq(partnersTable.active, true))
    .limit(50);

  const stateUpper = data.state.toUpperCase();
  const matched = partners.find((p) => {
    const coversState =
      p.states.length === 0 ||
      p.states.map((s) => s.toUpperCase()).includes(stateUpper);
    const coversDistributor =
      !data.distributor ||
      p.distributors.length === 0 ||
      p.distributors
        .map((d) => d.toLowerCase())
        .includes((data.distributor ?? "").toLowerCase());
    return coversState && coversDistributor;
  });

  const partnerCode = matched?.id ?? data.partnerCode ?? null;
  const noPartner = !matched;
  const finalStatus = noPartner ? "WAITLIST" : "SWITCH_REQUEST_SUBMITTED";

  const publicId = nanoid(12);

  const [switchReq] = await db
    .insert(switchRequestsTable)
    .values({
      publicId,
      track: "AUTO_GD_RESIDENTIAL",
      status: finalStatus,
      nome: data.nome,
      whatsapp: data.whatsapp,
      email: data.email ?? null,
      customerType: data.customerType,
      propertyType: data.propertyType ?? null,
      hasEv: data.hasEv ?? false,
      cep: data.cep ?? null,
      state: data.state,
      distributor: data.distributor ?? null,
      monthlyBillValue: data.monthlyBillValue?.toString() ?? null,
      estimatedDiscountMin: data.estimatedDiscountMin?.toString() ?? null,
      estimatedDiscountMax: data.estimatedDiscountMax?.toString() ?? null,
      estimatedSavingsMin: data.estimatedSavingsMin?.toString() ?? null,
      estimatedSavingsMax: data.estimatedSavingsMax?.toString() ?? null,
      billFileUrl: data.billFileUrl ?? null,
      source: data.source ?? null,
      campaign: data.campaign ?? null,
      partnerCode: partnerCode ?? null,
      lgpdConsent: data.lgpdConsent,
      partnerShareConsent: data.partnerShareConsent,
      whatsappConsent: data.whatsappConsent,
    })
    .returning();

  await db.insert(switchRequestEventsTable).values({
    switchRequestId: switchReq.id,
    eventType: "SWITCH_REQUEST_SUBMITTED",
    eventPayload: {
      state: data.state,
      distributor: data.distributor,
      noPartner,
      partnerCode,
    },
  });

  // Fire integration hook off the request path — a slow/down Ótima webhook must NOT block customer submission
  void fireIntegrationHook({
    event: "SWITCH_REQUEST_SUBMITTED",
    switchRequest: {
      publicId: switchReq.publicId,
      nome: switchReq.nome,
      whatsapp: switchReq.whatsapp,
      email: switchReq.email,
      customerType: switchReq.customerType,
      state: switchReq.state,
      distributor: switchReq.distributor,
      monthlyBillValue: switchReq.monthlyBillValue,
      estimatedDiscountMin: switchReq.estimatedDiscountMin,
      estimatedDiscountMax: switchReq.estimatedDiscountMax,
      estimatedSavingsMin: switchReq.estimatedSavingsMin,
      estimatedSavingsMax: switchReq.estimatedSavingsMax,
      billFileUrl: switchReq.billFileUrl,
      partnerCode: switchReq.partnerCode,
      source: switchReq.source,
      campaign: switchReq.campaign,
      createdAt: switchReq.createdAt,
    },
  });

  // Send WhatsApp confirmation off the request path — a missing/down WA API must NOT block the response
  void sendConfirmationTemplate({ whatsapp: data.whatsapp, nome: data.nome });

  req.log.info(
    { publicId, state: data.state, noPartner, status: finalStatus },
    "Switch request created"
  );

  res.status(201).json({
    publicId,
    status: finalStatus,
    statusLabel: statusLabel(finalStatus),
    trackingUrl: `/status/${publicId}`,
  });
});

router.get("/switch-requests/:publicId/status", async (req, res): Promise<void> => {
  const { publicId } = req.params;

  const [switchReq] = await db
    .select({
      publicId: switchRequestsTable.publicId,
      status: switchRequestsTable.status,
      updatedAt: switchRequestsTable.updatedAt,
    })
    .from(switchRequestsTable)
    .where(eq(switchRequestsTable.publicId, publicId))
    .limit(1);

  if (!switchReq) {
    res.status(404).json({ error: "Solicitação não encontrada." });
    return;
  }

  res.json({
    publicId: switchReq.publicId,
    status: switchReq.status,
    statusLabel: statusLabel(switchReq.status),
    updatedAt: switchReq.updatedAt.toISOString(),
  });
});

export default router;

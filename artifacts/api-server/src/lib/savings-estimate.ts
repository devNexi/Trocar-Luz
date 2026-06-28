import { db, gdOffersTable } from "@workspace/db";
import { and, eq, ne } from "drizzle-orm";

export interface EstimateParams {
  state: string;
  distributor?: string;
  monthlyBillValue: number;
  customerType: string;
  hasEv?: boolean;
}

export interface EstimateResult {
  eligible: boolean;
  discountMin: number;
  discountMax: number;
  savingsMinBrl: number;
  savingsMaxBrl: number;
  partnerAvailable: boolean;
  nextStep: "upload_bill" | "join_waitlist";
  disclaimer: string;
  coverageStatus: "eligible" | "consulta" | "below_minimum" | "no_coverage";
  // PERMANENT RULE: comercializadoras is for SERVER-SIDE ROUTING ONLY.
  // Partner identity is core broker IP — never expose to the client.
  // The HTTP route strips this field before res.json(). Do not remove this comment.
  comercializadoras: string[];
  minBillNeeded?: number;
}

const DISCLAIMER =
  "Estimativas são indicativas, sujeitas à análise da conta, distribuidora, região, disponibilidade de parceiro e aprovação final. Valores não garantidos.";

// Conservative tariff estimate for kWh reverse-calculation (residential avg Brazil ~R$0.85/kWh)
const AVG_TARIFF_BRL_KWH = 0.85;

export async function computeEstimate(params: EstimateParams): Promise<EstimateResult> {
  const uf = params.state.toUpperCase();
  const bill = params.monthlyBillValue;
  const estimatedKwh = Math.round(bill / AVG_TARIFF_BRL_KWH);

  // Fetch all non-"Sem Disponibilidade" offers for this UF
  const allUfOffers = await db
    .select()
    .from(gdOffersTable)
    .where(and(eq(gdOffersTable.uf, uf), ne(gdOffersTable.status, "Sem Disponibilidade")));

  if (allUfOffers.length === 0) {
    return noResult("no_coverage");
  }

  // Filter by tipo_cliente
  const tipoFilter = (tipoCliente: string): boolean => {
    if (params.customerType === "residential") {
      return tipoCliente.toLowerCase().includes("residencial");
    }
    return (
      tipoCliente.toLowerCase().includes("comercial") ||
      tipoCliente.toLowerCase().includes("grupo a")
    );
  };

  let pool = allUfOffers.filter((o) => tipoFilter(o.tipoCliente));
  // Fallback: if tipo_cliente filter leaves nothing, use full pool
  if (pool.length === 0) pool = allUfOffers;

  // Prefer specific distribuidora if provided
  if (params.distributor) {
    const distLower = params.distributor.toLowerCase();
    const distPool = pool.filter(
      (o) =>
        o.distribuidora.toLowerCase().includes(distLower) ||
        distLower.includes(o.distribuidora.toLowerCase()),
    );
    if (distPool.length > 0) pool = distPool;
  }

  // Ticket gate: pass if null (no minimum) or estimated consumption meets minimum
  const passesTicket = (ticketKwh: number | null): boolean =>
    ticketKwh === null || estimatedKwh >= ticketKwh;

  // 1. Disponível offers passing ticket gate
  const disponivel = pool.filter(
    (o) => o.status === "Disponível" && passesTicket(o.ticketMinimoKwh),
  );

  if (disponivel.length > 0) {
    const withDisc = disponivel.filter((o) => o.discountMin !== null && o.discountMax !== null);
    const discMin = withDisc.length > 0 ? Math.min(...withDisc.map((o) => o.discountMin!)) : 0;
    const discMax = withDisc.length > 0 ? Math.max(...withDisc.map((o) => o.discountMax!)) : 0;
    const comercializadoras = [...new Set(disponivel.map((o) => o.comercializadora))];
    return {
      eligible: true,
      discountMin: discMin,
      discountMax: discMax,
      savingsMinBrl: Math.round((bill * discMin) / 100),
      savingsMaxBrl: Math.round((bill * discMax) / 100),
      partnerAvailable: true,
      nextStep: "upload_bill",
      disclaimer: DISCLAIMER,
      coverageStatus: "eligible",
      comercializadoras,
    };
  }

  // 2. Sujeito a Consulta (ticket gate not enforced — consulta means custom analysis)
  const consulta = pool.filter((o) => o.status === "Sujeito a Consulta");
  if (consulta.length > 0) {
    const withDisc = consulta.filter((o) => o.discountMin !== null && o.discountMax !== null);
    const discMin = withDisc.length > 0 ? Math.min(...withDisc.map((o) => o.discountMin!)) : 0;
    const discMax = withDisc.length > 0 ? Math.max(...withDisc.map((o) => o.discountMax!)) : 0;
    const comercializadoras = [...new Set(consulta.map((o) => o.comercializadora))];
    return {
      eligible: true,
      discountMin: discMin,
      discountMax: discMax,
      savingsMinBrl: Math.round((bill * discMin) / 100),
      savingsMaxBrl: Math.round((bill * discMax) / 100),
      partnerAvailable: false,
      nextStep: "upload_bill",
      disclaimer: DISCLAIMER,
      coverageStatus: "consulta",
      comercializadoras,
    };
  }

  // 3. Disponível but all fail ticket gate (bill too low)
  const belowTicket = pool.filter(
    (o) => o.status === "Disponível" && !passesTicket(o.ticketMinimoKwh),
  );
  if (belowTicket.length > 0) {
    const minTicket = Math.min(...belowTicket.map((o) => o.ticketMinimoKwh!));
    const minBillNeeded = Math.ceil(minTicket * AVG_TARIFF_BRL_KWH);
    return {
      ...noResult("below_minimum"),
      minBillNeeded,
    };
  }

  return noResult("no_coverage");
}

function noResult(coverageStatus: "no_coverage" | "below_minimum"): EstimateResult {
  return {
    eligible: false,
    discountMin: 0,
    discountMax: 0,
    savingsMinBrl: 0,
    savingsMaxBrl: 0,
    partnerAvailable: false,
    nextStep: "join_waitlist",
    disclaimer: DISCLAIMER,
    coverageStatus,
    comercializadoras: [],
  };
}

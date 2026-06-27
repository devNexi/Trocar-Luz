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
}

const DISCLAIMER =
  "Estimativas são indicativas, sujeitas à análise da conta, distribuidora, região, disponibilidade de parceiro e aprovação final. Valores não garantidos.";

/**
 * GD discount bands by state (residential cota GD, net of TUSD-FIO).
 * Source: TrocarLuz commercial analysis of available GD offers, June 2026.
 * Ceiling: 22% (defensible upper bound for residential GD net discount after all fees).
 * To replace with live partner offers: use the gd_offers table (per-partner-per-region, status+ticket gate).
 */
const GD_BANDS: Record<string, { min: number; max: number }> = {
  SP: { min: 12, max: 20 },
  RJ: { min: 11, max: 18 },
  MG: { min: 12, max: 20 },
  RS: { min: 10, max: 17 },
  SC: { min: 10, max: 17 },
  PR: { min: 11, max: 18 },
  BA: { min: 10, max: 15 },
  CE: { min: 10, max: 15 },
  PE: { min: 10, max: 15 },
  GO: { min: 10, max: 17 },
  MT: { min: 10, max: 17 },
  MS: { min: 10, max: 16 },
  ES: { min: 11, max: 17 },
  DF: { min: 10, max: 16 },
  RN: { min: 9, max: 14 },
  PB: { min: 8, max: 13 },
  AL: { min: 8, max: 13 },
  SE: { min: 8, max: 13 },
  PI: { min: 8, max: 12 },
  MA: { min: 8, max: 12 },
  PA: { min: 8, max: 12 },
  AM: { min: 7, max: 11 },
  RO: { min: 7, max: 11 },
  TO: { min: 8, max: 12 },
  AC: { min: 7, max: 11 },
  AP: { min: 7, max: 11 },
  RR: { min: 7, max: 11 },
};

export function computeEstimate(params: EstimateParams): EstimateResult {
  const stateUpper = params.state.toUpperCase();
  const band = GD_BANDS[stateUpper] ?? { min: 8, max: 15 };

  const bill = params.monthlyBillValue;

  const eligible = bill >= 100;
  const partnerAvailable = eligible;

  if (!eligible) {
    return {
      eligible: false,
      discountMin: 0,
      discountMax: 0,
      savingsMinBrl: 0,
      savingsMaxBrl: 0,
      partnerAvailable: false,
      nextStep: "join_waitlist",
      disclaimer: DISCLAIMER,
    };
  }

  const savingsMinBrl = Math.round((bill * band.min) / 100);
  const savingsMaxBrl = Math.round((bill * band.max) / 100);

  return {
    eligible: true,
    discountMin: band.min,
    discountMax: band.max,
    savingsMinBrl,
    savingsMaxBrl,
    partnerAvailable,
    nextStep: "upload_bill",
    disclaimer: DISCLAIMER,
  };
}

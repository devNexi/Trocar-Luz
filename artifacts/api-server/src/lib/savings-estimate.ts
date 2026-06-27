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
  "Estimativas são indicativas e dependem da análise da conta, distribuidora, região, disponibilidade de parceiro e aprovação final. Valores não garantidos.";

const GD_BANDS: Record<string, { min: number; max: number }> = {
  SP: { min: 15, max: 30 },
  RJ: { min: 14, max: 28 },
  MG: { min: 15, max: 30 },
  RS: { min: 13, max: 27 },
  SC: { min: 13, max: 27 },
  PR: { min: 14, max: 28 },
  BA: { min: 12, max: 25 },
  CE: { min: 12, max: 25 },
  PE: { min: 12, max: 25 },
  GO: { min: 13, max: 27 },
  MT: { min: 13, max: 27 },
  MS: { min: 13, max: 26 },
  ES: { min: 14, max: 27 },
  DF: { min: 13, max: 26 },
  RN: { min: 12, max: 24 },
  PB: { min: 11, max: 23 },
  AL: { min: 11, max: 23 },
  SE: { min: 11, max: 23 },
  PI: { min: 11, max: 22 },
  MA: { min: 11, max: 22 },
  PA: { min: 10, max: 22 },
  AM: { min: 10, max: 20 },
  RO: { min: 10, max: 20 },
  TO: { min: 11, max: 22 },
  AC: { min: 10, max: 20 },
  AP: { min: 10, max: 20 },
  RR: { min: 10, max: 20 },
};

export function computeEstimate(params: EstimateParams): EstimateResult {
  const stateUpper = params.state.toUpperCase();
  const band = GD_BANDS[stateUpper] ?? { min: 10, max: 25 };

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

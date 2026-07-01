import { randomBytes } from "crypto";

export interface OfferOptionData {
  gdOfferId: number;
  label: string;
  discountPct: number;
  savingsBrl: number;
  fidelidade: string;
}

interface OfferSession {
  expiresAt: number;
  parsedKwh: number | null;
  parsedDistribuidora: string | null;
  parsedGrupo: string | null;
  billValue: number | null;
  pii: {
    nome?: string | null;
    cpf?: string | null;
    cnpj?: string | null;
    ucCode?: string | null;
  };
  options: Map<string, OfferOptionData>;
}

const SESSION_TTL_MS = 30 * 60 * 1000;
const store = new Map<string, OfferSession>();

setInterval(() => {
  const now = Date.now();
  for (const [id, session] of store) {
    if (session.expiresAt < now) store.delete(id);
  }
}, 5 * 60 * 1000).unref();

export interface CreateSessionInput {
  parsedKwh: number | null;
  parsedDistribuidora: string | null;
  parsedGrupo: string | null;
  billValue: number | null;
  pii: {
    nome?: string | null;
    cpf?: string | null;
    cnpj?: string | null;
    ucCode?: string | null;
  };
  offers: Array<{
    gdOfferId: number;
    discountPct: number;
    savingsBrl: number;
    fidelidade: string;
  }>;
}

export interface SessionOption {
  optionId: string;
  label: string;
  discountPct: number;
  savingsBrl: number;
  fidelidade: string;
}

export interface CreateSessionResult {
  sessionId: string;
  options: SessionOption[];
}

const LABELS = ["Opção A", "Opção B", "Opção C", "Opção D", "Opção E"];

export function createOfferSession(input: CreateSessionInput): CreateSessionResult {
  const sessionId = randomBytes(16).toString("hex");
  const optionMap = new Map<string, OfferOptionData>();
  const resultOptions: SessionOption[] = [];

  for (let i = 0; i < Math.min(input.offers.length, LABELS.length); i++) {
    const offer = input.offers[i];
    const optionId = randomBytes(12).toString("hex");
    const label = LABELS[i];
    optionMap.set(optionId, { ...offer, label });
    resultOptions.push({
      optionId,
      label,
      discountPct: offer.discountPct,
      savingsBrl: offer.savingsBrl,
      fidelidade: offer.fidelidade,
    });
  }

  store.set(sessionId, {
    expiresAt: Date.now() + SESSION_TTL_MS,
    parsedKwh: input.parsedKwh,
    parsedDistribuidora: input.parsedDistribuidora,
    parsedGrupo: input.parsedGrupo,
    billValue: input.billValue,
    pii: input.pii,
    options: optionMap,
  });

  return { sessionId, options: resultOptions };
}

export interface ResolvedOption {
  gdOfferId: number;
  label: string;
  discountPct: number;
  savingsBrl: number;
  fidelidade: string;
  parsedKwh: number | null;
  parsedDistribuidora: string | null;
  parsedGrupo: string | null;
  billValue: number | null;
  pii: {
    nome?: string | null;
    cpf?: string | null;
    cnpj?: string | null;
    ucCode?: string | null;
  };
}

export function resolveOfferOption(
  sessionId: string,
  optionId: string
): ResolvedOption | null {
  const session = store.get(sessionId);
  if (!session) return null;
  if (session.expiresAt < Date.now()) {
    store.delete(sessionId);
    return null;
  }
  const option = session.options.get(optionId);
  if (!option) return null;
  return {
    gdOfferId: option.gdOfferId,
    label: option.label,
    discountPct: option.discountPct,
    savingsBrl: option.savingsBrl,
    fidelidade: option.fidelidade,
    parsedKwh: session.parsedKwh,
    parsedDistribuidora: session.parsedDistribuidora,
    parsedGrupo: session.parsedGrupo,
    billValue: session.billValue,
    pii: session.pii,
  };
}

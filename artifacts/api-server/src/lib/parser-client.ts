import { logger } from "./logger";

const PARSER_BASE_URL = "https://parser.otimaenergia.com";

export interface ParsedBillPii {
  nome: string | null;
  cpf: string | null;
  cnpj: string | null;
  ucCode: string | null;
}

export interface ParsedBill {
  ok: boolean;
  confidence: "high" | "medium" | "low" | "unreadable";
  consumoKwh: number | null;
  distribuidora: string | null;
  grupoTarifario: string | null;
  tipoCliente: string | null;
  mesReferencia: string | null;
  valorTotal: number | null;
  pii: ParsedBillPii;
  rawResponse: unknown;
}

function normalizeParsedBill(raw: unknown): ParsedBill {
  const r = raw as Record<string, unknown>;
  const data = (typeof r.data === "object" && r.data !== null ? r.data : r) as Record<string, unknown>;

  const rawConfidence = String(r.confidence ?? data.confidence ?? "low").toLowerCase();
  const confidence: ParsedBill["confidence"] = (["high", "medium", "low", "unreadable"] as const).includes(
    rawConfidence as ParsedBill["confidence"]
  )
    ? (rawConfidence as ParsedBill["confidence"])
    : "low";

  const consumoRaw =
    data.consumption ??
    data.consumo ??
    data.consumo_kwh ??
    data.consumoKwh ??
    data.energy_kwh;

  const valorRaw =
    data.total_amount ??
    data.valorTotal ??
    data.valor_total ??
    data.amount ??
    data.total;

  return {
    ok: true,
    confidence,
    consumoKwh: consumoRaw != null ? Math.round(Number(consumoRaw)) : null,
    distribuidora: String(data.distributor ?? data.distribuidora ?? "").trim() || null,
    grupoTarifario:
      String(data.tariff_group ?? data.grupo ?? data.grupoTarifario ?? data.group ?? "").trim() ||
      null,
    tipoCliente:
      String(
        data.customer_type ?? data.tipoCliente ?? data.tipo_cliente ?? data.consumer_type ?? ""
      ).trim() || null,
    mesReferencia:
      String(
        data.reference_month ?? data.mesReferencia ?? data.mes_referencia ?? data.month ?? ""
      ).trim() || null,
    valorTotal: valorRaw != null ? Number(valorRaw) : null,
    pii: {
      nome: String(data.customer_name ?? data.nome ?? data.name ?? "").trim() || null,
      cpf: String(data.cpf ?? data.document ?? "").trim() || null,
      cnpj: String(data.cnpj ?? "").trim() || null,
      ucCode:
        String(
          data.installation_code ?? data.uc_code ?? data.ucCode ?? data.uc ?? data.unit_code ?? ""
        ).trim() || null,
    },
    rawResponse: raw,
  };
}

export async function parseBillFile(
  fileBuffer: Buffer,
  contentType: string,
  filename: string
): Promise<ParsedBill> {
  const apiKey = process.env.PARSER_API_KEY;
  if (!apiKey) {
    logger.warn("PARSER_API_KEY not set — bill parsing unavailable");
    return unreadableBill();
  }

  try {
    const formData = new FormData();
    const blob = new Blob([new Uint8Array(fileBuffer)], { type: contentType });
    formData.append("file", blob, filename);

    const response = await fetch(`${PARSER_BASE_URL}/parse?force=BILL`, {
      method: "POST",
      headers: { "X-Parser-Key": apiKey },
      body: formData,
      signal: AbortSignal.timeout(120_000),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      logger.warn({ status: response.status, body }, "Parser API returned non-OK status");
      return unreadableBill();
    }

    const raw = await response.json();
    const parsed = normalizeParsedBill(raw);

    logger.info(
      {
        confidence: parsed.confidence,
        consumoKwh: parsed.consumoKwh,
        distribuidora: parsed.distribuidora,
      },
      "Bill parsed"
    );

    return parsed;
  } catch (err) {
    logger.error({ err }, "Bill parser request failed");
    return unreadableBill();
  }
}

export async function checkParserHealth(): Promise<boolean> {
  const apiKey = process.env.PARSER_API_KEY;
  if (!apiKey) return false;

  try {
    const response = await fetch(`${PARSER_BASE_URL}/health`, {
      headers: { "X-Parser-Key": apiKey },
      signal: AbortSignal.timeout(5_000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

function unreadableBill(): ParsedBill {
  return {
    ok: false,
    confidence: "unreadable",
    consumoKwh: null,
    distribuidora: null,
    grupoTarifario: null,
    tipoCliente: null,
    mesReferencia: null,
    valorTotal: null,
    pii: { nome: null, cpf: null, cnpj: null, ucCode: null },
    rawResponse: null,
  };
}

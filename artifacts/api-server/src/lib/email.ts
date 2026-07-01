import { logger } from "./logger";

const NOTIFICATION_EMAIL = process.env.LEAD_NOTIFICATION_EMAIL ?? "leads@trocarluz.com.br";

interface LeadEmailData {
  type: "residential" | "business";
  nome: string;
  whatsapp: string;
  estado: string;
  distribuidora?: string | null;
  consumoBand?: string | null;
  empresa?: string | null;
  valorContaBand?: string | null;
  segmento?: string | null;
  pageSource?: string | null;
}

export async function sendLeadNotification(lead: LeadEmailData): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    logger.warn("RESEND_API_KEY not set — skipping email notification");
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  const subject = `Novo lead GD ${lead.type === "business" ? "Empresarial" : "Residencial"} — ${lead.estado}`;

  const residentialDetails = `
    <p><strong>Consumo médio:</strong> ${lead.consumoBand ?? "—"}</p>
    <p><strong>Distribuidora:</strong> ${lead.distribuidora ?? "—"}</p>
  `;

  const businessDetails = `
    <p><strong>Empresa:</strong> ${lead.empresa ?? "—"}</p>
    <p><strong>Conta mensal:</strong> ${lead.valorContaBand ?? "—"}</p>
    <p><strong>Segmento:</strong> ${lead.segmento ?? "—"}</p>
  `;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #1A1F36;">Novo lead TrocaLuz</h2>
      <p><strong>Tipo:</strong> ${lead.type === "business" ? "Empresarial" : "Residencial"}</p>
      <p><strong>Nome:</strong> ${lead.nome}</p>
      <p><strong>WhatsApp:</strong> ${lead.whatsapp}</p>
      <p><strong>Estado:</strong> ${lead.estado}</p>
      ${lead.type === "residential" ? residentialDetails : businessDetails}
      <p><strong>Fonte:</strong> ${lead.pageSource ?? "TrocaLuz"}</p>
      <p><strong>Data:</strong> ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</p>
      <hr style="border: 1px solid #E2E1DC; margin: 24px 0;" />
      <p style="color: #6B7080; font-size: 12px;">Este email foi enviado automaticamente pela TrocaLuz.</p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "leads@trocarluz.com.br",
      to: NOTIFICATION_EMAIL,
      subject,
      html,
    });
    logger.info({ estado: lead.estado, type: lead.type }, "Lead notification email sent");
  } catch (err) {
    logger.error({ err }, "Failed to send lead notification email");
  }
}

interface UnreadableBillData {
  state: string;
  distributor?: string | null;
  customerType: string;
  billObjectPath?: string | null;
  confidence: string;
  errorReason?: string;
}

export async function sendUnreadableBillNotification(data: UnreadableBillData): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    logger.warn("RESEND_API_KEY not set — skipping unreadable bill notification");
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  const subject = `[Ação] Conta ilegível — ${data.state} · ${data.customerType}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #B91C1C;">⚠ Conta de luz ilegível — revisão manual necessária</h2>
      <p>O parser não conseguiu extrair dados utilizáveis desta conta. O cliente foi encaminhado para o fluxo de estimativa manual.</p>
      <hr style="border: 1px solid #E2E1DC; margin: 16px 0;" />
      <p><strong>Estado:</strong> ${data.state}</p>
      <p><strong>Distribuidora:</strong> ${data.distributor ?? "—"}</p>
      <p><strong>Tipo de cliente:</strong> ${data.customerType}</p>
      <p><strong>Confiança do parser:</strong> ${data.confidence}</p>
      ${data.errorReason ? `<p><strong>Motivo:</strong> ${data.errorReason}</p>` : ""}
      ${data.billObjectPath ? `<p><strong>Caminho do arquivo:</strong> ${data.billObjectPath}</p>` : ""}
      <p><strong>Data:</strong> ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</p>
      <hr style="border: 1px solid #E2E1DC; margin: 24px 0;" />
      <p style="color: #6B7080; font-size: 12px;">Este alerta foi enviado automaticamente pela TrocaLuz.</p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "leads@trocarluz.com.br",
      to: NOTIFICATION_EMAIL,
      subject,
      html,
    });
    logger.info({ state: data.state, confidence: data.confidence }, "Unreadable bill notification sent");
  } catch (err) {
    logger.error({ err }, "Failed to send unreadable bill notification");
  }
}

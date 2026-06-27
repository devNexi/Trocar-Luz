import { logger } from "./logger";

interface SendConfirmationParams {
  whatsapp: string;
  nome: string;
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("55") && digits.length >= 12) return digits;
  return `55${digits}`;
}

export async function sendConfirmationTemplate({ whatsapp, nome }: SendConfirmationParams): Promise<void> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME ?? "trocarluz_confirmation";

  if (!phoneNumberId || !accessToken) {
    logger.warn(
      { whatsapp, nome },
      "WhatsApp not configured — WHATSAPP_PHONE_NUMBER_ID or WHATSAPP_ACCESS_TOKEN missing. Skipping send."
    );
    return;
  }

  const to = normalizePhone(whatsapp);
  const url = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;

  const body = {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: templateName,
      language: { code: "pt_BR" },
    },
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      logger.error({ status: res.status, body: text, whatsapp: to }, "WhatsApp API error");
    } else {
      logger.info({ whatsapp: to, nome }, "WhatsApp confirmation template sent");
    }
  } catch (err) {
    logger.error({ err, whatsapp: to }, "WhatsApp send failed");
  }
}

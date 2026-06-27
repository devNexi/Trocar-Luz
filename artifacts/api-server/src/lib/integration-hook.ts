import { logger } from "./logger";
import type { SwitchRequest } from "@workspace/db";

export interface IntegrationPayload {
  event: "SWITCH_REQUEST_SUBMITTED";
  switchRequest: Pick<
    SwitchRequest,
    | "publicId"
    | "nome"
    | "whatsapp"
    | "email"
    | "customerType"
    | "state"
    | "distributor"
    | "monthlyBillValue"
    | "estimatedDiscountMin"
    | "estimatedDiscountMax"
    | "estimatedSavingsMin"
    | "estimatedSavingsMax"
    | "billFileUrl"
    | "partnerCode"
    | "source"
    | "campaign"
    | "createdAt"
  >;
}

export async function fireIntegrationHook(payload: IntegrationPayload): Promise<void> {
  logger.info(
    { event: payload.event, publicId: payload.switchRequest.publicId },
    "Integration hook fired — stub (Ótima Portal / Zoho not yet configured)"
  );
}

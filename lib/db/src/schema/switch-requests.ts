import {
  pgTable,
  text,
  timestamp,
  uuid,
  numeric,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const switchRequestsTable = pgTable("switch_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  publicId: text("public_id").unique().notNull(),
  track: text("track").notNull().default("AUTO_GD_RESIDENTIAL"),
  status: text("status").notNull().default("SWITCH_REQUEST_SUBMITTED"),
  nome: text("nome").notNull(),
  whatsapp: text("whatsapp").notNull(),
  email: text("email"),
  customerType: text("customer_type").notNull().default("residential"),
  propertyType: text("property_type"),
  hasEv: boolean("has_ev").notNull().default(false),
  cep: text("cep"),
  state: text("state").notNull(),
  distributor: text("distributor"),
  monthlyBillValue: numeric("monthly_bill_value", { precision: 10, scale: 2 }),
  estimatedDiscountMin: numeric("estimated_discount_min", { precision: 5, scale: 2 }),
  estimatedDiscountMax: numeric("estimated_discount_max", { precision: 5, scale: 2 }),
  estimatedSavingsMin: numeric("estimated_savings_min", { precision: 10, scale: 2 }),
  estimatedSavingsMax: numeric("estimated_savings_max", { precision: 10, scale: 2 }),
  billFileUrl: text("bill_file_url"),
  source: text("source"),
  campaign: text("campaign"),
  partnerCode: text("partner_code"),
  lgpdConsent: boolean("lgpd_consent").notNull().default(false),
  partnerShareConsent: boolean("partner_share_consent").notNull().default(false),
  whatsappConsent: boolean("whatsapp_consent").notNull().default(false),
  proposalValidUntil: timestamp("proposal_valid_until", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertSwitchRequestSchema = createInsertSchema(switchRequestsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertSwitchRequest = z.infer<typeof insertSwitchRequestSchema>;
export type SwitchRequest = typeof switchRequestsTable.$inferSelect;

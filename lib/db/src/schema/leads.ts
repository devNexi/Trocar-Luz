import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const leadsTable = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: text("type").notNull(),
  nome: text("nome").notNull(),
  whatsapp: text("whatsapp").notNull(),
  estado: text("estado").notNull(),
  distribuidora: text("distribuidora"),
  consumoBand: text("consumo_band"),
  empresa: text("empresa"),
  valorContaBand: text("valor_conta_band"),
  segmento: text("segmento"),
  pageSource: text("page_source"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leadsTable).omit({ id: true, createdAt: true });
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leadsTable.$inferSelect;

import { pgTable, serial, text, real, integer, timestamp } from "drizzle-orm/pg-core";

export const gdOffersTable = pgTable("gd_offers", {
  id: serial("id").primaryKey(),
  distribuidora: text("distribuidora").notNull(),
  estado: text("estado").notNull(),
  uf: text("uf").notNull(),
  regiao: text("regiao").notNull().default(""),
  grupoTarifario: text("grupo_tarifario").notNull(),
  comercializadora: text("comercializadora").notNull(),
  produto: text("produto").notNull().default("GD"),
  status: text("status").notNull(),
  descontoVariavelRaw: text("desconto_variavel_raw").notNull().default("-"),
  descontoFixoRaw: text("desconto_fixo_raw").notNull().default("-"),
  ticketMinimoRaw: text("ticket_minimo_raw").notNull().default("-"),
  fidelidade: text("fidelidade").notNull().default(""),
  tipoCliente: text("tipo_cliente").notNull().default(""),
  observacoes: text("observacoes").notNull().default(""),
  discountMin: real("discount_min"),
  discountMax: real("discount_max"),
  ticketMinimoKwh: integer("ticket_minimo_kwh"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type GdOffer = typeof gdOffersTable.$inferSelect;
export type NewGdOffer = typeof gdOffersTable.$inferInsert;

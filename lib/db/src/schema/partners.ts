import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";

export const partnersTable = pgTable("partners", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  states: text("states").array().notNull().default([]),
  distributors: text("distributors").array().notNull().default([]),
  active: boolean("active").notNull().default(true),
  contactRoute: text("contact_route"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Partner = typeof partnersTable.$inferSelect;

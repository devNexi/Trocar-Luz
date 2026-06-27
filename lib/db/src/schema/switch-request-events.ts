import { pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";

export const switchRequestEventsTable = pgTable("switch_request_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  switchRequestId: uuid("switch_request_id").notNull(),
  eventType: text("event_type").notNull(),
  eventPayload: jsonb("event_payload"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type SwitchRequestEvent = typeof switchRequestEventsTable.$inferSelect;

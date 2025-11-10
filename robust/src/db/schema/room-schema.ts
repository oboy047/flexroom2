import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const rooms = sqliteTable("rooms", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text().notNull(),
  capacity: integer().notNull(),     // hvor mange personer
});
export type Room = typeof rooms.$inferSelect;

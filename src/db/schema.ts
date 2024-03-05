import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core"

export const appConfigTable = sqliteTable("configuration", {
  id: integer("id").primaryKey(),
  key: text("key", {
    length: 255,
  })
    .unique()
    .notNull(),
  value: text("value", {
    length: 1000,
  }).notNull(),
  createdAt: text("created_at"),
  lastUpdatedAt: text("last_updated_at"),
})
export type AppConfig = typeof appConfigTable.$inferSelect

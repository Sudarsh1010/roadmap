import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { baseFields } from "../base-fields";
import { usersTable } from "./users";

export const sessionsTable = sqliteTable("session", {
  ...baseFields,
  user_id: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  expires_at: integer("expires_at").notNull(),
});

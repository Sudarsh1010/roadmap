import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { baseFields } from "../base-fields";
import { usersTable } from "./users";

export const roadmapsTable = sqliteTable("roadmap", {
  ...baseFields,
  prompt: text("prompt").notNull(),
  title: text("title"),
  description: text("description"),
  user_id: text("user_id")
    .references(() => usersTable.id)
    .notNull(),
});

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { baseFields } from "../base-fields";
import { topicsTable } from "./topics";

export const conceptsTable = sqliteTable("concept", {
  ...baseFields,
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  order: integer("order").notNull(),
  topic_id: text("topic_id")
    .references(() => topicsTable.id)
    .notNull(),
});

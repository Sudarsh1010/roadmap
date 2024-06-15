import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { baseFields } from "../base-fields";
import { topicsTable } from "./topics";

export const projectsTable = sqliteTable("project", {
  ...baseFields,
  title: text("title").notNull(),
  description: text("description").notNull(),
  reference: text("reference").notNull().default(""),
  topic_id: text("topic_id")
    .references(() => topicsTable.id)
    .notNull(),
});

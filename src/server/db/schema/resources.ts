import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { baseFields } from "../base-fields";
import { conceptsTable } from "./concepts";

export const resourcesTable = sqliteTable("resource", {
  ...baseFields,
  title: text("title").notNull(),
  url: text("url").notNull(),
  concept_id: text("concept_id")
    .references(() => conceptsTable.id)
    .notNull(),
});

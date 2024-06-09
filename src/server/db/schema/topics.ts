import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { baseFields } from "../base-fields";
import { roadmapsTable } from "./roadmaps";

export const topicsTable = sqliteTable("topic", {
  ...baseFields,
  title: text("title").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull(),
  roadmap_id: text("roadmap_id")
    .references(() => roadmapsTable.id)
    .notNull(),
});

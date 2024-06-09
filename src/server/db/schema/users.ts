import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { baseFields } from "../base-fields";

export const usersTable = sqliteTable("user", {
  ...baseFields,
  name: text("name"),
  email: text("email"),
  image: text("image"),
  github_id: text("github_id").unique(),
  username: text("username"),
});

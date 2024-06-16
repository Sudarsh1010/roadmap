import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { baseFields } from "../base-fields";

export const usersTable = sqliteTable("user", {
  ...baseFields,
  name: text("name"),
  email: text("email"),
  image: text("image"),
  clerk_user_id: text("clerk_user_id").unique(),
});

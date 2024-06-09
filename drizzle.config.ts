import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/server/db/schema/index.ts",
	dialect: "sqlite",
	driver: "d1",
	dbCredentials: {
		dbName: "be-studious",
		wranglerConfigPath: "./wrangler.toml",
	},
});

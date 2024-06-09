import { getDrizzle } from "./index";

import { migrate } from "drizzle-orm/d1/migrator";

export const migrator = async () => {
  await migrate(getDrizzle(), {
    migrationsFolder: "drizzle",
  })
    .then(() => {
      console.log("Database migrations done");
    })
    .catch((err) => {
      console.error("Database migrations failed", err);
    });
};

migrator();

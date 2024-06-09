import { Lucia } from "lucia";

import { getRequestContext } from "@cloudflare/next-on-pages";
import { D1Adapter } from "@lucia-auth/adapter-sqlite";

export function initializeLucia() {
  const adapter = new D1Adapter(getRequestContext().env.DB, {
    user: "user",
    session: "session",
  });
  return new Lucia(adapter, {
    sessionCookie: {
      expires: false,
      attributes: {
        secure: process.env.NODE_ENV === "production",
      },
    },
    getUserAttributes: (attributes) => {
      return attributes;
    },
  });
}

declare module "lucia" {
  interface Register {
    Lucia: ReturnType<typeof initializeLucia>;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  name: string;
  image: string;
  github_id: number;
  username: string | null;
  email: string | null;
}

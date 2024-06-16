import "server-only";

import { cookies, headers } from "next/headers";
import { cache } from "react";

import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { NextRequest } from "next/server";
import { env } from "~/env";
import { getAuth } from "@clerk/nextjs/server";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
  return createTRPCContext({
    headers: new Headers({
      cookie: cookies().toString(),
      "x-trpc-source": "rsc",
    }),
    auth: getAuth(
      new NextRequest(
        env.NODE_ENV === "production"
          ? "https://bestudious.sudarsh.me"
          : "http://localhost:3000",
        { headers: headers() },
      ),
    ),
  });
});

export const api = createCaller(createContext);

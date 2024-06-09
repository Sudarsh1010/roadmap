"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { initializeLucia } from "./index";

export const invalidateSession = async () => {
  const lucia = initializeLucia();
  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  redirect("/login");
};

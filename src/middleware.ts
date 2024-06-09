import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { validateRequest } from "./server/auth/validate-request";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const { session, user } = await validateRequest();

  if (
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.includes("trpc")
  ) {
    return response;
  }

  const redirectUrl = request.nextUrl.clone();
  if (request.nextUrl.pathname.includes("login") && session && user) {
    redirectUrl.pathname = "/app";

    return NextResponse.redirect(redirectUrl);
  }

  if (!request.nextUrl.pathname.includes("login") && (!session || !user)) {
    redirectUrl.pathname = "/login";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api/|trpc/|api/trpc/)(.*)"],
};

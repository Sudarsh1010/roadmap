import { OAuth2RequestError } from "arctic";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { initializeLucia } from "~/server/auth";
import { github } from "~/server/auth/github-provider";
import { getDrizzle } from "~/server/db";
import { usersTable as users } from "~/server/db/schema";

export const runtime = "edge";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("github_oauth_state")?.value ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  const db = getDrizzle();
  const lucia = initializeLucia();

  try {
    const tokens = await github.validateAuthorizationCode(code);
    console.log("tokens");
    console.log(tokens);

    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();
    console.log(githubUser);

    // Replace this with your own DB client.
    const existingUser = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.github_id, githubUser.id))
      .get();

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    // Replace this with your own DB client.
    const user = await db
      .insert(users)
      .values({
        name: githubUser.name ?? "",
        github_id: githubUser.id,
        username: githubUser.login,
        email: githubUser.email,
        image: githubUser.avatar_url,
      })
      .returning({ id: users.id })
      .get();

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    console.log(e);

    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }

    return new Response(null, {
      status: 500,
    });
  }
}

interface GitHubUser {
  id: string;
  login: string;
  avatar_url: string;
  name: string | null;
  email: string | null;
}

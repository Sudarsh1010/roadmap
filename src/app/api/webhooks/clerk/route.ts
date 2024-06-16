import type { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { env } from "~/env";
import { getDrizzle } from "~/server/db";
import { usersTable } from "~/server/db/schema";

export const runtime = "edge";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = env.WEBHOOK_SECRET;

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const db = getDrizzle();

  switch (evt.type) {
    case "user.created":
      const {
        id,
        first_name,
        last_name,
        email_addresses,
        primary_email_address_id,
      } = evt.data;

      const { email_address } = email_addresses.find(
        (e) => e.id === primary_email_address_id,
      )!;

    await db
      .insert(usersTable)
      .values({
        clerk_user_id: id,
        name: `${first_name!}${last_name ? ` ${last_name}` : ""}`,
        email: email_address,
      })
      .execute();

    case "user.updated":
      const { first_name: updatedFirstName, last_name: updatedLastName } =
        evt.data;

      await db
        .update(usersTable)
        .set({
          name: `${updatedFirstName!}${updatedLastName ? ` ${updatedLastName}` : ""}`,
        })
        .execute();
  }

  return new Response("", { status: 200 });
}

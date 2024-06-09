import { asc, eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { getDrizzle } from "~/server/db";
import { topicsTable } from "~/server/db/schema";

export const runtime = "edge";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const db = getDrizzle();
  const topic = await db
    .select({ id: topicsTable.id })
    .from(topicsTable)
    .where(eq(topicsTable.roadmap_id, id))
    .limit(1)
    .orderBy(asc(topicsTable.order))
    .get();

  if (!topic) {
    notFound();
  }

  redirect(`/roadmap/${id}/${topic.id}`);
}

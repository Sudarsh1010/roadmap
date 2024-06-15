import { eq } from "drizzle-orm";
import { object, string } from "zod";
import { projectsTable } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectsRouter = createTRPCRouter({
  all: protectedProcedure
    .input(
      object({
        topic_id: string(),
      }),
    )
    .query(async ({ ctx: { db }, input: { topic_id } }) => {
      return await db
        .select({
          id: projectsTable.id,
          title: projectsTable.title,
          descripton: projectsTable.description,
          reference: projectsTable.reference,
        })
        .from(projectsTable)
        .where(eq(projectsTable.topic_id, topic_id));
    }),
});

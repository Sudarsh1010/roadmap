import { asc, eq } from "drizzle-orm";
import { string } from "zod";
import { topicsTable } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const topicsRouter = createTRPCRouter({
  getTopicsByRoadmapId: protectedProcedure
    .input(string())
    .query(async ({ ctx: { db }, input: id }) => {
      return await db
        .select({
          id: topicsTable.id,
          title: topicsTable.title,
          description: topicsTable.description,
          order: topicsTable.order,
        })
        .from(topicsTable)
        .where(eq(topicsTable.roadmap_id, id))
        .orderBy(asc(topicsTable.order));
    }),
});

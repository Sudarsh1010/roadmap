import { eq } from "drizzle-orm";
import { string } from "zod";
import { roadmapsTable, usersTable } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const roadmapRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx: { db, auth } }) => {
    return await db
      .select({
        id: roadmapsTable.id,
        title: roadmapsTable.title,
        prompt: roadmapsTable.prompt,
        description: roadmapsTable.description,
      })
      .from(roadmapsTable)
      .innerJoin(usersTable, eq(roadmapsTable.user_id, usersTable.id))
      .where(eq(usersTable.clerk_user_id, auth.userId!));
  }),

  getTitle: protectedProcedure
    .input(string())
    .query(async ({ ctx: { db }, input: id }) => {
      if (!id) return null;
      return db
        .select({
          title: roadmapsTable.title,
          prompt: roadmapsTable.prompt,
        })
        .from(roadmapsTable)
        .limit(1)
        .where(eq(roadmapsTable.id, id))
        .get();
    }),
});

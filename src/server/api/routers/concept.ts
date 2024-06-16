import { TRPCError } from "@trpc/server";
import { asc, eq, sql } from "drizzle-orm";
import { string } from "zod";
import { conceptsTable } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const conceptsRouter = createTRPCRouter({
  getConceptsByTopicId: protectedProcedure
    .input(string())
    .query(async ({ ctx: { db }, input: topicId }) => {
      return await db
        .select({
          id: conceptsTable.id,
          title: conceptsTable.title,
          order: conceptsTable.order,
        })
        .from(conceptsTable)
        .where(eq(conceptsTable.topic_id, topicId))
        .orderBy(asc(conceptsTable.order));
    }),

  all: protectedProcedure
    .input(string())
    .query(async ({ ctx: { db }, input: topicId }) => {
      try {
        return (
          await db.all<{
            id: string;
            title: string;
            summary: string;
            topic_id: string;
            resources: string;
          }>(
            sql`
  SELECT
    c.id,
    c.title,
    c.summary,
    c.topic_id,
		(
      SELECT
        COALESCE(
          json_group_array(
            json_object(
              'id', resource.id,
              'title', resource.title,
              'url', resource.url
            )
          ), '[]'
        )
      FROM
        resource
      WHERE
        resource.concept_id = c.id
    ) AS resources

  FROM concept c
  WHERE c.topic_id = ${topicId};
`,
          )
        ).map((res) => {
          return {
            ...res,
            summary: JSON.parse(res.summary) as string[],
            resources: JSON.parse(res.resources) as {
              id: string;
              title: string;
              url: string;
            }[],
          };
        });
      } catch (_) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});

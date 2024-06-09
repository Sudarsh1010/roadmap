import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { array, object, string } from "zod";
import { generateRoadmapSchema } from "~/schemas/generate-roadmap-mutation-input";
import {
  conceptsTable,
  resourcesTable,
  roadmapsTable,
  topicsTable,
} from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

// ai model
const model = google("models/gemini-1.5-flash-latest");

// ai resposne schema
const schema = object({
  topics: array(
    object({
      title: string().describe("Title of the topic"),
      description: string().describe(
        "Description of the topic using 10-15 words",
      ),
      concepts: array(
        object({
          title: string().describe("Title of the concept"),
          summary: array(
            string().describe("Detailed well explained Summary of concept"),
          ).describe("Detailed Summary of concept in array"),
          resources: array(
            object({
              title: string().describe("Title of resouce"),
              url: string().describe("Url for the resouce"),
            }),
          ),
        }),
      ),
    }),
  ),
});

export const aiRouter = createTRPCRouter({
  generateRoadmap: protectedProcedure
    .input(generateRoadmapSchema)
    .mutation(async ({ input: { prompt }, ctx: { db, user } }) => {
      const { object } = await generateObject({
        system: `You are an experienced mentor tasked with generating a detailed roadmap. Your goal is to provide a comprehensive roadmap that includes every single concept, topic, or any other terms relevant to the user's request. 
          Please ensure that the roadmap is thorough and covers all relevant aspects.`,
        model,
        schema,
        prompt: `generate a roadmap.
          Here is promp: """${prompt}"""`,
      });
      console.log(object);

      const roadmap = await db
        .insert(roadmapsTable)
        .values({
          prompt,
          user_id: user.id,
        })
        .returning({ id: roadmapsTable.id })
        .get();

      await Promise.all(
        object.topics.map(async (topic, topicIdx) => {
          const createdTopic = await db
            .insert(topicsTable)
            .values({
              description: topic.description,
              title: topic.title,
              order: topicIdx,
              roadmap_id: roadmap.id,
            })
            .returning({ id: topicsTable.id })
            .get();

          await Promise.all(
            topic.concepts.map(async (concept, conceptIdx) => {
              const createdConcept = await db
                .insert(conceptsTable)
                .values({
                  summary: JSON.stringify(concept.summary),
                  topic_id: createdTopic.id,
                  order: conceptIdx,
                  title: concept.title,
                })
                .returning({ id: topicsTable.id })
                .get();

              await db.insert(resourcesTable).values(
                concept.resources.map((resource) => ({
                  concept_id: createdConcept.id,
                  ...resource,
                })),
              );
            }),
          );
        }),
      );

      return roadmap;
    }),
});

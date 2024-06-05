import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { array, object, string } from "zod";
import { generateRoadmapSchema } from "~/schemas/generate-roadmap-mutation-input";
import { createTRPCRouter, publicProcedure } from "../trpc";

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
          summary: array(string().describe("Summary of concept")).describe(
            "Summary of concept in array",
          ),
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
  generateRoadmap: publicProcedure
    .input(generateRoadmapSchema)
    .mutation(async ({ input: { prompt } }) => {
      const { object } = await generateObject({
        model,
        schema,
        prompt: `generate a roadmap in given format.
          Here is promp: """${prompt}"""`,
      });

      object.topics.map((topic) => console.log(topic));
      return null;
    }),
});

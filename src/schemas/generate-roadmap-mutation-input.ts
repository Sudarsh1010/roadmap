import { z } from "zod";

export const generateRoadmapSchema = z.object({
  prompt: z.string(),
});

export type GenerateRoadmapSchemaType = z.infer<typeof generateRoadmapSchema>;

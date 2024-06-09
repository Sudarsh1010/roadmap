import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { aiRouter } from "./routers/ai";
import { conceptsRouter } from "./routers/concept";
import { roadmapRouter } from "./routers/roadmap";
import { topicsRouter } from "./routers/topic";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ai: aiRouter,
  roadmap: roadmapRouter,
  topic: topicsRouter,
  concept: conceptsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

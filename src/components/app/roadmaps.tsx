import Link from "next/link";
import { api } from "~/trpc/server";
import { CreateRoadmap } from "../roadmap/create";
import {
  MinimalCard,
  MinimalCardDescription,
  MinimalCardTitle,
} from "../ui/minimal-card";
import { NoRoadmapPlaceholder } from "./no-roadmap";

export const Roadmaps = async () => {
  const roadmaps = await api.roadmap.all();

  if (!roadmaps.length) {
    return (
      <>
        <div className="flex items-center">
          <h1 className="font-semibold text-lg md:text-2xl">Roadmaps</h1>
        </div>
        <NoRoadmapPlaceholder />
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-2xl">Roadmaps</h1>
        {roadmaps.length < 3 ? <CreateRoadmap /> : null}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2 lg:gap-6">
        {roadmaps.map((r) => (
          <Link key={r.id + "roadmap id"} href={`/roadmap/${r.id}`}>
            <MinimalCard className="h-36">
              <MinimalCardTitle className="line-clamp-2">
                {r.title ?? r.prompt}
              </MinimalCardTitle>
              <MinimalCardDescription>{r.description}</MinimalCardDescription>
            </MinimalCard>
          </Link>
        ))}
      </div>
    </>
  );
};

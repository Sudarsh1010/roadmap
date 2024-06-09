"use server";

import { notFound } from "next/navigation";
import { GradientHeading } from "~/components/ui/gradient-text";
import { api } from "~/trpc/server";

export const RoadmapTitle = async ({ id }: { id: string }) => {
  const data = await api.roadmap.getTitle(id);

  if (!data) {
    notFound();
  }

  return (
    <GradientHeading className="line-clamp-2" size={"xs"}>
      {data.title || data.prompt}
    </GradientHeading>
  );
};

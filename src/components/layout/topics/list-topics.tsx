"use server";

import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/server";

const RenderTopicLinks = dynamic(
  () => import("./render-topic-links").then((mod) => mod.RenderTopicLinks),
  { ssr: true },
);

export const ListTopics = async ({ id }: { id: string }) => {
  const topics = await api.topic.getTopicsByRoadmapId(id);

  return (
    <Card className="flex w-80 flex-col overflow-hidden bg-muted">
      <CardHeader className="px-4 pt-4">
        <CardTitle>Topics</CardTitle>
      </CardHeader>

      <Separator />
      <RenderTopicLinks topics={topics} />
    </Card>
  );
};

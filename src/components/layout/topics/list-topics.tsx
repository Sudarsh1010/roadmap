"use server";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/server";

const RenderTopicLinks = dynamic(
  () => import("./render-topic-links").then((mod) => mod.RenderTopicLinks),
  { ssr: false },
);

const RenderTopicLinksMobile = dynamic(
  () =>
    import("./render-topic-links-mobile").then(
      (mod) => mod.RenderTopicLinksMobile,
    ),
  { ssr: false },
);

export const ListTopics = async ({ id }: { id: string }) => {
  const topics = await api.topic.getTopicsByRoadmapId(id);

  return (
    <>
      <Card className="flex w-3/12 max-w-80 flex-col overflow-hidden bg-muted max-lg:hidden">
        <CardHeader className="px-4 pt-4">
          <CardTitle>Topics</CardTitle>
        </CardHeader>

        <Separator />
        <RenderTopicLinks topics={topics} />
      </Card>

      <Card className="flex w-full flex-col overflow-hidden bg-muted lg:hidden">
        <CardHeader className="px-4 pt-4 pb-2">
          <CardTitle>Topics</CardTitle>
        </CardHeader>
        <CardContent className="p-2 pt-0">
          <RenderTopicLinksMobile topics={topics} />
        </CardContent>
      </Card>
    </>
  );
};

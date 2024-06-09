import type { ReactNode } from "react";
import { RoadmapTitle } from "~/components/layout/roadmap/title";
import { ListTopics } from "~/components/layout/topics/list-topics";
import { Separator } from "~/components/ui/separator";

export default async function Layout({
  children,
  params: { id },
}: {
  children: ReactNode;
  params: { id: string };
}) {
  return (
    <div className="flex h-screen flex-1 flex-col gap-4 overflow-hidden rounded-md bg-white p-4 lg:gap-6 lg:p-6">
      <RoadmapTitle id={id} />
      <Separator />
      <div className="flex flex-1 gap-4 overflow-hidden lg:gap-6">
        <ListTopics id={id} />
        {children}
      </div>
    </div>
  );
}

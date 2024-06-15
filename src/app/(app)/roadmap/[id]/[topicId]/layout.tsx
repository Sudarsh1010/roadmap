import type { ReactNode } from "react";
import { RenderProjects } from "~/components/projects/render-project";

export default async function Layout({
  children,
  params: { topicId },
}: {
  children: ReactNode;
  params: { id: string; topicId: string };
}) {
  return (
    <>
      {children}
      <RenderProjects topicId={topicId} />
    </>
  );
}

import { api } from "~/trpc/server";
import { GradientHeading } from "../ui/gradient-text";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { buttonVariants } from "../ui/button";

export const RenderProjects = async ({ topicId }: { topicId: string }) => {
  const projects = await api.project.all({ topic_id: topicId });

  if (!projects || !projects.length) {
    return null;
  }

  return (
    <div className="w-1/5 space-y-3 max-lg:hidden">
      <GradientHeading size={"xs"}>Project Ideas</GradientHeading>
      <div className="flex flex-col">
        {projects.map((p) => (
          <Link
            href={p.reference}
            target="_blank"
            className={cn(
              buttonVariants({ size: "sm", variant: "link" }),
              "justify-start px-0",
            )}
            key={p.id}
          >
            {p.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

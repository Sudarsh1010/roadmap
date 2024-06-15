import Link from "next/link";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/server";
import { buttonVariants } from "../ui/button";
import { GradientHeading } from "../ui/gradient-text";
import { Label } from "../ui/label";
import {
  MinimalCard,
  MinimalCardContent,
  MinimalCardTitle,
} from "../ui/minimal-card";

export const ListConcepts = async ({ topicId }: { topicId: string }) => {
  const concepts = await api.concept.all(topicId);

  return (
    <div className="flex flex-col gap-4 divide-y pr-2">
      {concepts.map((c, index) => {
        return (
          <section
            className={cn(
              "flex items-start justify-between max-lg:flex-col lg:gap-x-3 max-lg:gap-y-2",
              index > 0 && "pt-4",
            )}
          >
            <div className="w-full lg:w-7/12">
              <GradientHeading size={"xxs"}>{c.title}</GradientHeading>
              <div>
                <Label>Summary</Label>
                <ul className="ml-5 list-disc">
                  {c.summary.map((d) => (
                    <li key={d + "summary" + c.id} className="text-sm">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <MinimalCard className="w-full lg:w-5/12">
              <MinimalCardTitle>Resources</MinimalCardTitle>
              <MinimalCardContent className="mt-2 pb-2">
                <ul className="list-decimal">
                  {c.resources.map((r) => (
                    <li key={r.id + "resource" + c.id} className="text-sm">
                      <p>{r.title}</p>
                      <Link
                        href={r.url}
                        className={cn(
                          buttonVariants({
                            variant: "link",
                          }),
                          "line-clamp-1 rounded-none px-0 py-1 text-blue-700",
                        )}
                        target="_blank"
                      >
                        {r.url}
                      </Link>
                    </li>
                  ))}
                </ul>
              </MinimalCardContent>
            </MinimalCard>
          </section>
        );
      })}
    </div>
  );
};

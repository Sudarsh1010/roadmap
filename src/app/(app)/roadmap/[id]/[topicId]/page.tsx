import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { GradientHeading } from "~/components/ui/gradient-text";
import { Label } from "~/components/ui/label";
import {
  MinimalCard,
  MinimalCardContent,
  MinimalCardTitle,
} from "~/components/ui/minimal-card";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/server";

export const runtime = "edge";

interface PageProps {
  params: { id: string; topicId: string; conceptId: string };
}

export default async function Page({ params: { topicId } }: PageProps) {
  const concepts = await api.concept.all(topicId);

  return (
    <main className="flex flex-1 flex-col overflow-y-scroll py-2">
      <div className="flex flex-col gap-4 divide-y pr-2">
        {concepts.map((c, index) => {
          return (
            <section
              className={cn(
                "flex items-start justify-between gap-x-4",
                index > 0 && "pt-4",
              )}
            >
              <div>
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

              <MinimalCard className="w-full min-w-96 md:w-2/5">
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
    </main>
  );
}

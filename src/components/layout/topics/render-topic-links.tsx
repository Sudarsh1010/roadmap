"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CardContent } from "~/components/ui/card";
import {
  MinimalCard,
  MinimalCardDescription,
  MinimalCardTitle,
} from "~/components/ui/minimal-card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn } from "~/lib/utils";

export const RenderTopicLinks = ({
  topics,
}: {
  topics: {
    id: string;
    title: string;
    description: string;
    order: number;
  }[];
}) => {
  // params
  const { id, topicId } = useParams();

  // state
  const [height, setHeight] = useState(0);

  // ref
  const ref = useRef<HTMLDivElement | null>(null);

  // effect
  useEffect(() => {
    if (ref.current) setHeight(ref.current.offsetHeight);
  }, [ref]);

  return (
    <CardContent ref={ref} className="h-full overflow-hidden px-4 py-0">
      <div className="overflow-hidden">
        <ScrollArea className="-mr-3 pr-3" style={{ height: height }}>
          <section className="flex flex-col gap-y-2 overflow-x-hidden py-4">
            {topics.map((topic) => (
              <Link
                key={`/roadmap/${id}/${topic.id}`}
                href={`/roadmap/${id}/${topic.id}`}
              >
                <MinimalCard
                  className={cn(
                    "mx-0.5 flex flex-col items-start",
                    topic.id === topicId && "bg-primary hover:bg-primary/95",
                    topic.id === topicId &&
                      "shadow-[1_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]",
                  )}
                >
                  <MinimalCardTitle
                    className={cn(
                      "line-clamp-1 text-left text-sm",
                      topic.id === topicId && "text-background",
                    )}
                  >
                    {topic.title}
                  </MinimalCardTitle>
                  <MinimalCardDescription
                    className={cn(
                      "line-clamp-3 text-left text-xs",
                      topic.id === topicId && "text-neutral-300",
                    )}
                  >
                    {topic.description}
                  </MinimalCardDescription>
                </MinimalCard>
              </Link>
            ))}
          </section>
        </ScrollArea>
      </div>
    </CardContent>
  );
};

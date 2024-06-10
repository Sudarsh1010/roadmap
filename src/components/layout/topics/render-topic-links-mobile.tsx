"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export const RenderTopicLinksMobile = ({
  topics,
}: {
  topics: {
    id: string;
    title: string;
    description: string;
    order: number;
  }[];
}) => {
  // router
  const router = useRouter();

  // params
  const { topicId, id } = useParams<{ topicId?: string; id: string }>();

  // callback
  const onValueChange = useCallback(
    (val: string) => {
      router.push(`/roadmap/${id}/${val}`);
    },
    [router],
  );

  return (
    <Select value={topicId} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue defaultValue={topicId} placeholder="Theme" />
      </SelectTrigger>

      <SelectContent>
        {topics.map((topic) => (
          <SelectItem value={topic.id} key={topic.id + "mobile"}>
            {topic.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

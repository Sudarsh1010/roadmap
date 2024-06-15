import { ListConcepts } from "~/components/concepts/list";

export const runtime = "edge";

interface PageProps {
  params: { id: string; topicId: string; conceptId: string };
}

export default async function Page({ params: { topicId } }: PageProps) {

  return (
    <main className="flex w-full flex-1 flex-col overflow-y-scroll py-2">
      <ListConcepts topicId={topicId} />
    </main>
  );
}

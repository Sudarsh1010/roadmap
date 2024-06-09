import { Roadmaps } from "~/components/app/roadmaps";

export const runtime = "edge";

export default async function Page() {
  return (
    <main className="flex flex-1 flex-col gap-4 rounded-md bg-white p-4 lg:gap-6 lg:p-6">
      <Roadmaps />
    </main>
  );
}

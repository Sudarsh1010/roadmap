import { CreateRoadmap } from "../layout/roadmap/create";

export const NoRoadmapPlaceholder = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 rounded-md bg-white p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Roadmaps</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="font-bold text-2xl tracking-tight">
            You have no Roadmaps
          </h3>
          <p className="text-muted-foreground text-sm">
            Create your own roadmaps or learning path.
          </p>

          <CreateRoadmap />
        </div>
      </div>
    </main>
  );
};

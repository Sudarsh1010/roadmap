import { CreateRoadmap } from "../roadmap/create";

export const NoRoadmapPlaceholder = () => {
  return (
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
  );
};

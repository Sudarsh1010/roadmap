import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function Home() {
  // await api.ai.generateRoadmap();
  // return <div></div>;
  redirect("/app");
}

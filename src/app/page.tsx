import { redirect } from "next/navigation";

export default async function Home() {
  // await api.ai.generateRoadmap();
  // return <div></div>;
  redirect("/app");
}

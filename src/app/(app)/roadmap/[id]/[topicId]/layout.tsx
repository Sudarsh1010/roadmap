import type { ReactNode } from "react";

export default async function Layout({
  children,
  params: {},
}: {
  children: ReactNode;
  params: { id: string; topicId: string };
}) {
  return (
    <>
      {children}
      <div className="w-80"></div>
    </>
  );
}

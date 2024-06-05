import type { ReactNode } from "react";
import { Header } from "~/components/layout/app/header";
import { SideNav } from "~/components/layout/app/side-nav";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div
      vaul-drawer-wrapper=""
      className="grid min-h-screen w-full bg-muted p-2 lg:grid-cols-[250px_1fr] md:grid-cols-[200px_1fr]"
    >
      <SideNav />
      <div className="flex flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
}

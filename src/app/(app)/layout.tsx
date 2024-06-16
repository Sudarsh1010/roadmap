import type { ReactNode } from "react";
import { Header } from "~/components/layout/app/header";
import { SideNav } from "~/components/layout/app/side-nav";

export default async function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div vaul-drawer-wrapper="" className="flex h-svh w-full bg-muted p-2">
      <SideNav />
      <div className="flex h-full w-full flex-1 flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
}

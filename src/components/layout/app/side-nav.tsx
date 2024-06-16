"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { Home, Package2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

export const SideNav = () => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "hidden w-64 md:block",
        pathname.startsWith("/roadmap") && "md:hidden",
      )}
    >
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/app" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Be Studious</span>
          </Link>
        </div>

        <div className="flex-1">
          <nav className="grid items-start pl-2 font-medium text-sm lg:pl-4">
            <Link
              href="/app"
              className={cn(
                "flex items-center gap-3 rounded-l-md px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname.startsWith("/app") &&
                  "border-primary border-r-2 bg-white/80 text-primary",
              )}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
          </nav>
        </div>

        <Separator className="mt-auto mb-4" />
        <SignedIn>
          <div className="flex flex-row items-center justify-end px-4 pb-2">
            <UserButton showName />
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

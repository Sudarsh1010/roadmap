"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { Home, MapIcon, Menu, Package2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { cn } from "~/lib/utils";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "flex h-14 w-full items-center gap-4 px-2 md:hidden",
        pathname.startsWith("/roadmap") && "md:flex md:px-3",
      )}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="link" size="icon" className="shrink-0 border-0">
            <Menu className="size-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 font-medium text-lg">
            <Link
              href="/app"
              className="mb-4 flex items-center gap-x-2 font-semibold text-lg"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Be Studious</span>
            </Link>

            <Link
              href="/app"
              className={cn(
                "flex items-center gap-x-4 rounded-md px-3 py-2 text-muted-foreground text-sm hover:text-foreground",
                pathname.startsWith("/app") && "bg-muted text-primary",
              )}
            >
              <Home className="size-4" />
              Dashboard
            </Link>

            <Link
              href="/app"
              className={cn(
                "flex items-center gap-x-4 rounded-md px-3 py-2 text-muted-foreground text-sm hover:text-foreground",
                pathname.startsWith("/roadmap") && "bg-muted text-primary",
              )}
            >
              <MapIcon className="size-4" />
              Roadmap
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1"></div>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

"use client";

import { CircleUser, Home, Menu, Package2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { TextureButton } from "~/components/ui/texture-button";
import { cn } from "~/lib/utils";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="flex h-14 items-center gap-4 px-2 md:hidden">
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
              className="flex items-center gap-2 font-semibold text-lg"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>

            <Link
              href="/app"
              className={cn(
                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                pathname.startsWith("/app") && "bg-muted text-primary",
              )}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1"></div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <TextureButton variant="icon" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </TextureButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

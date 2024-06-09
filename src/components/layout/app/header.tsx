"use client";

import { CircleUser, Home, MapIcon, Menu, Package2 } from "lucide-react";
import Image from "next/image";
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
import { useSession } from "~/provider/session-provider";
import { invalidateSession } from "~/server/auth/invalidate-session";

export const Header = () => {
  const pathname = usePathname();
  const { user } = useSession();

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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <>
            {user?.image ? (
              <Image
                className="object-cover"
                src={user.image}
                alt={"profile image"}
                height={24}
                width={24}
              />
            ) : (
              <TextureButton
                variant="icon"
                size="icon"
                className={cn(
                  "overflow-hidden rounded-full",
                  user?.image && "p-0",
                )}
              >
                <CircleUser className="size-5" />
              </TextureButton>
            )}
            <span className="sr-only">Toggle user menu</span>
          </>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />

          <form className="w-full" action={invalidateSession}>
            <DropdownMenuItem className="w-full hover:cursor-pointer" asChild>
              <button type="submit">Logout</button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

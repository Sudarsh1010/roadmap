"use client";

import { ChevronUp, Home, Package2, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import { useSession } from "~/provider/session-provider";
import { invalidateSession } from "~/server/auth/invalidate-session";

export const SideNav = () => {
  const pathname = usePathname();
  const { user } = useSession();

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
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-x-2 pr-4 pl-2 lg:pr-5">
              {user.image ? (
                <Image
                  src={user.image}
                  width={32}
                  height={32}
                  alt={user.name || user.username || "user"}
                />
              ) : (
                <div className="rounded-sm border-1 border-black p-2">
                  <User className="size-8" strokeWidth={1} />
                </div>
              )}

              <div className="space-y-1 text-left">
                <p className="font-medium text-sm">{user.name}</p>
                <p className="font-light text-xs">
                  {user.email || user.username}
                </p>
              </div>

              <ChevronUp className="ml-auto size-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />

              <form className="w-full" action={invalidateSession}>
                <DropdownMenuItem
                  className="w-full hover:cursor-pointer"
                  asChild
                >
                  <button type="submit">Logout</button>
                </DropdownMenuItem>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </div>
  );
};

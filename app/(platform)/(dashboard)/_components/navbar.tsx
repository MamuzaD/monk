"use client";

import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { BoardPopover } from "@/components/form/board-popover";
import { MobileSidebar } from "./mobile-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
  const { isLoaded } = useOrganization();

  if (!isLoaded) return <Navbar.Skeleton />;

  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm  bg-neutral-50 dark:bg-neutral-950 flex items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-x-5">
        <ModeToggle />
        <div className="md:block hidden">
          <OrganizationSwitcher
            hidePersonal
            afterCreateOrganizationUrl="/organization/:id"
            afterLeaveOrganizationUrl="/select-org"
            afterSelectOrganizationUrl="/organization/:id"
            appearance={{
              elements: {
                avatarBox: {
                  height: 32,
                  width: 32,
                },
              },
            }}
          />
        </div>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 32,
                width: 32,
              },
            },
          }}
        />
        <BoardPopover align="start" side="bottom" sideOffset={16}>
          <Button
            size={"sm"}
            className="rounded-full block p-2 h-auto w-auto mr-4 hover:opacity-80 md:rounded-xl"
          >
            <span className="hidden md:block px-2">Create</span>
            <span className="block md:hidden">
              <Plus className="h-4 w-4" />
            </span>
          </Button>
        </BoardPopover>
      </div>
    </nav>
  );
};

Navbar.Skeleton = function SkeletonNavbar() {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white dark:bg-neutral-900 flex items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-x-5">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="rounded-full block p-2 h-auto w-auto mr-4">
          <Skeleton className="hidden md:block px-2 h-4 w-16" />
          <Skeleton className="block md:hidden h-4 w-4" />
        </Skeleton>
      </div>
    </nav>
  );
};

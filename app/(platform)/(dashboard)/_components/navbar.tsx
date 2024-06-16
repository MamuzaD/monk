import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { FormPopover } from "@/components/form/form-popover";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-x-5">
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
        <FormPopover align="start" side="bottom" sideOffset={16}>
          <Button
            size={"sm"}
            className="rounded-full block p-2 h-auto w-auto mr-4 hover:opacity-80 md:rounded-xl"
          >
            <span className="hidden md:block px-2">Create</span>
            <span className="block md:hidden">
              <Plus className="h-4 w-4" />
            </span>
          </Button>
        </FormPopover>
      </div>
    </nav>
  );
};

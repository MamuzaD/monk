import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-x-5">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl="organization/:id"
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
        <Button
          size={"sm"}
          className=" rounded-full block"
        >
          <Plus className="h-4 w-4"/>
        </Button>
      </div>
    </nav>
  );
};

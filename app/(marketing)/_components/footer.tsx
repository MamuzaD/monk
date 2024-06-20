import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 border-t bg-neutral-50 dark:bg-neutral-950/50">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <Button size={"sm"} variant={"ghost"}>
          <Link className="hover:opacity-80" href="/about">
            About
          </Link>
        </Button>
      </div>
    </div>
  );
};

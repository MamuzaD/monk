import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 border-t bg-neutral-50 dark:bg-neutral-950">
      <div className="flex items-center justify-center">
        <Button size={"sm"} variant={"ghost"}>
          <Link className="hover:opacity-80" href="/policy">
            Privacy Policy
          </Link>
        </Button>
        <Separator orientation="vertical" className=" h-5" />
        <Button size={"sm"} variant={"ghost"}>
          <Link className="hover:opacity-80" href="/about">
            About
          </Link>
        </Button>
        <Separator orientation="vertical" className=" h-5" />
        <Button size={"sm"} variant={"ghost"}>
          <Link className="hover:opacity-80" href="/tos">
            Terms of Service{" "}
          </Link>
        </Button>
      </div>
    </div>
  );
};

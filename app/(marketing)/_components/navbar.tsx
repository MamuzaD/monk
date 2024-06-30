import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-16 px-4 border-b shadow-sm  bg-neutral-50 dark:bg-neutral-950 flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 w-auto h-auto flex items-center justify-end ">
          
          <ModeToggle />
          <Button size={"sm"} variant={"outline"} asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size={"sm"} variant={"default"} asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

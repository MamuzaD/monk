import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav className="fixed top-0 w-full h-16 px-4 border-b shadow-sm bg-white dark:bg-neutral-950 flex items-center justify-between">
        <Logo />
        <ModeToggle />
      </nav>
      <div className="h-5/6 flex items-center justify-center mt-24">{children}</div>
    </>
  );
};

export default ClerkLayout;

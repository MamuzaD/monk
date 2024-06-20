import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body className="h-full">
      <nav className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white dark:bg-neutral-950/50 flex items-center justify-between">
        <Logo />
        <ModeToggle />
      </nav>
      <div className="h-5/6 flex items-center justify-center ">{children}</div>
    </body>
  );
};

export default ClerkLayout;

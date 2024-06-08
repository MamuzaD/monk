import { Logo } from "@/components/logo";

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <nav className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center justify-center">
        <Logo />
      </nav>
      <div className="h-full flex items-center justify-center pt-14">
        {children}
      </div>
    </div>
  );
};

export default ClerkLayout;

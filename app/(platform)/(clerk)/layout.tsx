import { Logo } from "@/components/logo";

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body className="h-full">
      <nav className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center justify-center">
        <Logo />
      </nav>
      <div className="h-5/6 flex items-center justify-center ">
        {children}
      </div>
    </body>
  );
};

export default ClerkLayout;

import { Navbar } from "@/app/(marketing)/_components/navbar";

const ClerkLayout = ({children}: {children: React.ReactNode}) => {
  return (    
    <div className="h-full flex items-center justify-center">
      {children}
    </div>
  );
};

export default ClerkLayout;
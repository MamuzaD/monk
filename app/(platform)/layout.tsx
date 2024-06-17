import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { PopupProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        <PopupProvider />
        {children}
      </QueryProvider>  
    </ClerkProvider>
  );
}

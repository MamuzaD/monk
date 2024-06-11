import { ClerkProvider } from "@clerk/nextjs";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      {/* <html lang="en">
        <body>
          <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header> */}
      {children}
      {/* </body>
      </html> */}
    </ClerkProvider>
  );
}

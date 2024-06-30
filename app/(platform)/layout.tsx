"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { PopupProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { useTheme } from "next-themes";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  const darkModeAppearance = {
    variables: {
      colorPrimary: "#737373",
      colorInputText: "white",
      colorTextOnPrimaryBackground: "white",
      colorTextSecondary: "white",
      colorNeutral: "white",
      colorText: "white",
      colorBackground: "#0F0F0F",
      colorInputBackground: "#0F0F0F",
    },
  };

  const defaultAppearance = {
    variables: {
      colorPrimary: "#2F3037",
      colorInputText: "black",
      colorTextOnPrimaryBackground: "white",
      colorTextSecondary: "#747686",
      colorNeutral: "black",
      colorText: "#212126",
      colorBackground: "white",
      colorInputBackground: "white",
    },
  };

  return (
    <ClerkProvider
      appearance={theme === "dark" ? darkModeAppearance : defaultAppearance}
    >
      <QueryProvider>
        <Toaster />
        <PopupProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
}

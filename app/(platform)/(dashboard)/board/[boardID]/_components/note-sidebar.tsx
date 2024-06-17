"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useNoteSidebar } from "@/hooks/use-note-sidebar";
import { Notebook } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "../../../_components/sidebar";

export const NoteSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const isOpen = useNoteSidebar((state) => state.isOpen);
  const onOpen = useNoteSidebar((state) => state.onOpen);
  const onClose = useNoteSidebar((state) => state.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) return null;

  return (
    <>
      <Button
        onClick={onOpen}
        className="absolute rounded-full right-2 mt-8 bg-white/70 h-auto w-auto p-3"
        variant="ghost"
        size="sm"
      >
        <Notebook className="h-5 w-5" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="p-2 pt-10" side="right">
          <Sidebar storageKey="mobile-sidebar-state" />
        </SheetContent>
      </Sheet>
    </>
  );
};

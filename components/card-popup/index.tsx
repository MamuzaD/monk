"use client";

import { useCardPopup } from "@/hooks/use-card";
import { Dialog, DialogContent } from "../ui/dialog";

export const CardPopup = () => {
  const id = useCardPopup((state) => state.id);
  
  const isOpen = useCardPopup((state) => state.isOpen);
  const onClose = useCardPopup((state) => state.onClose);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>{id}</DialogContent>
    </Dialog>
  );
};

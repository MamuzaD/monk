import { create } from "zustand";

type StripeModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useStripeModal = create<StripeModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

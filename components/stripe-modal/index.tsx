"use client";

import { useStripeModal } from "@/hooks/use-stripe-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";

export const StripeModal = () => {
  const stripeModal = useStripeModal();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    execute({});
  };

  return (
    <Dialog open={stripeModal.isOpen} onOpenChange={stripeModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative fle items-center justify-center"></div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">Upgrade to Pro Version</h2>
          <p className="text-xs font-semibold text-neutral-600"></p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimted Workspaces</li>
              <li>Unlimited Boards</li>
              <li>Unlimited Notes</li>
            </ul>
          </div>
          <Button onClick={onClick} className="w-full" disabled={isLoading}>
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

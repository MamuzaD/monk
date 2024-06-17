"use client";

import { toast } from "sonner";
import { useAction } from "@/hooks/use-action";
import { useStripeModal } from "@/hooks/use-stripe-modal";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";

interface SubscribeButtonProps {
  isPro: boolean;
}

export const SubscribeButton = ({ isPro }: SubscribeButtonProps) => {
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
    if (isPro) execute({});
    else stripeModal.onOpen();
  };

  return (
    <Button onClick={onClick} disabled={isLoading}>
      {isPro ? "Manage Subscription" : "Upgrade to pro"}
    </Button>
  );
};

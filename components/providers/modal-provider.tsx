"use client";

import { useEffect, useState } from "react";
import { CardModal } from "../card-modal";
import { StripeModal } from "../stripe-modal";

export const PopupProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CardModal />
      <StripeModal />
    </>
  );
};

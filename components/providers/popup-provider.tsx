"use client";

import { useEffect, useState } from "react";
import { CardPopup } from "../card-popup";

export const PopupProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if(!isMounted) return null;

  return (
    <>
    <CardPopup />
    </>
  )
}
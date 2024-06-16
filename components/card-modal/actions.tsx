"use client";

import { CardWList } from "@/types";
import { Skeleton } from "../ui/skeleton";

interface ActionProps {
  card: CardWList;
}

export const Actions = ({ card }: ActionProps) => {
  return (
    <div>
      <p>Actions</p>
    </div>
  );
};

Actions.Skeleton = function SkeletonActions() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};

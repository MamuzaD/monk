"use client";

import { useAction } from "@/hooks/use-action";
import { copyCard } from "@/actions/card-actions/copy-card";
import { deleteCard } from "@/actions/card-actions/delete-card";
import { CardWList } from "@/types";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Copy, Trash } from "lucide-react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useCardModal } from "@/hooks/use-card-modal";

interface ActionProps {
  card: CardWList;
}

export const Actions = ({ card }: ActionProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: () => {
        toast.success(`Card "${card.title}" copied`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );
  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (card) => {
        toast.success(`Card "${card.title} deleted`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopyCard({ id: card.id, boardId });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({ id: card.id, boardId });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        onClick={onCopy}
        className="w-full justify-start"
        variant="gray"
        size="inline"
        disabled={isLoadingCopy}
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        className="w-full justify-start"
        variant="gray"
        size="inline"
        disabled={isLoadingDelete}
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function SkeletonActions() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200 dark:bg-neutral-800" />
      <Skeleton className="w-full h-8 bg-neutral-200 dark:bg-neutral-800" />
      <Skeleton className="w-full h-8 bg-neutral-200 dark:bg-neutral-800" />
    </div>
  );
};

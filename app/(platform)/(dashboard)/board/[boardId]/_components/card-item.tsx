"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/use-card-modal";
import { AlignJustify } from "lucide-react";

interface CardItemProps {
  card: Card;
  index: number;
}

export const CardItem = ({ card, index }: CardItemProps) => {
  const CardModal = useCardModal();

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => CardModal.onOpen(card.id)}
          className="border-2 border-transparent hover:border-black/40 py-2 px-3 text-sm bg-white dark:bg-neutral-800 rounded-md shadow-sm"
        >
          {card.title}
          {card.description ? <AlignJustify className="ml-2 h-4 w-4 mt-2"></AlignJustify>:  <>
          </>
          }
        </div>
      )}
    </Draggable>
  );
};

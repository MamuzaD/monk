"use client";

import { ElementRef, useRef, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { ListWCard } from "@/types";
import { ListHeader } from "./list-header";
import { CardForm } from "./card-form";
import { cn } from "@/lib/utils";
import { CardItem } from "./card-item";

interface ListItemProps {
  index: number;
  list: ListWCard;
}

export const ListItem = ({ index, list }: ListItemProps) => {
  const textAreaRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[272px] select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md bg-neutral-50 dark:bg-neutral-900 shadow-md pb-2"
          >
            <ListHeader list={list} onAddCard={enableEditing} />
            <Droppable droppableId={list.id} type="card">
              {(provided) => (
                <ol
                ref={provided.innerRef}
                {...provided.droppableProps}
                  className={cn(
                    "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                    list.cards.length > 0 ? "mt-2" : "mt-0"
                  )}
                >
                  {list.cards.map((card, index) => (
                    <CardItem index={index} key={card.id} card={card} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              listId={list.id}
              ref={textAreaRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};

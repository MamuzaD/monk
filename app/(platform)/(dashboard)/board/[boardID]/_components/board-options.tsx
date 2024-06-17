"use client";

import { MoreHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRenameBoard } from "@/hooks/use-renameboard";
import { Board } from "@prisma/client";
import { DeleteBoard } from "./delete-board";
import { RenameBoard } from "./rename-board";

interface BoardOptionsProps {
  board: Board;
}

export const BoardOptions = ({ board }: BoardOptionsProps) => {
  const { closeRef, formRef, inputRef, onSubmit, fieldErrors, isLoading } =
    useRenameBoard({ board });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-labelledby="board options"
          className="h-auto w-auto p-2 rounded-full"
          variant="transparent"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board Actions
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            className="h-auto w-auto p-2 rounded-full absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <RenameBoard
          board={board}
          formRef={formRef}
          closeRef={closeRef}
          inputRef={inputRef}
          onSubmit={onSubmit}
          fieldErrors={fieldErrors} 
          isLoading={isLoading}
        />
        <DeleteBoard title={board.title} id={board.id} />
      </PopoverContent>
    </Popover>
  );
};

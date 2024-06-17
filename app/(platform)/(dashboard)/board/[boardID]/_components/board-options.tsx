"use client";

import { MoreHorizontal, X } from "lucide-react";
import { deleteBoard } from "@/actions/board-actions/delete-board";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDeleteBoard } from "@/hooks/use-deleteboard";
import { useBoardRename } from "@/hooks/use-renameboard";
import { Board } from "@prisma/client";
import { DeleteBoard } from "./delete-board";

interface BoardOptionsProps {
  board: Board;
  className?: string;
}

export const BoardOptions = ({ board, className }: BoardOptionsProps) => {
  const { enableEditing, isLoading: isLoadingRename } = useBoardRename({ board });

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
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 rounded-full absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          disabled={isLoadingRename}
          //onClick={}
          className="rounded-non w-full h-auto p-2 px-5 justify-start font-normal"
        >
          Rename Board
        </Button>
        <DeleteBoard title={board.title} id={board.id}/>
      </PopoverContent>
    </Popover>
  );
};

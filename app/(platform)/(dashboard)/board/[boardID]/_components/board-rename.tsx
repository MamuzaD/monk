"use client";

import { Board } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface BoardRenameProps {
  board: Board;
}

export const BoardRename = ({ board }: BoardRenameProps) => {
  return (
  <Button className="font-bold text-lg h-auto w-auto -1 px-2" variant="transparent">
    {board.title}
  </Button>
  );
};

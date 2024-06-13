import { Board } from "@prisma/client";
import { BoardRename } from "./board-rename";
import { BoardOptions } from "./board-options";

interface BoardNavbarProps {
  board: Board;

}
export const BoardNavbar = async ({board}: BoardNavbarProps) => {

  return(
    <nav className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
      <BoardRename board={board}/>
      <div className="ml-auto">
        <BoardOptions id={board.id} />
      </div>
    </nav>
  )
}
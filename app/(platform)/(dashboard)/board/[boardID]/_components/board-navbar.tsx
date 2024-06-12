import { Board } from "@prisma/client";
import { BoardRename } from "./board-rename";

interface BoardNavbarProps {
  board: Board;

}
export const BoardNavbar = async ({board}: BoardNavbarProps) => {

  return(
    <nav className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
      <BoardRename board={board}/>
    </nav>
  )
}
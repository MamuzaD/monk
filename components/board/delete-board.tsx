import { Button } from "@/components/ui/button";
import { DeleteConfirm } from "./delete-confirm";
import { useDeleteBoard } from "@/hooks/use-deleteboard";

interface DeleteBoardProps {
  title: string;
  id: string,
}

export const DeleteBoard = ({title, id}: DeleteBoardProps) => {
  const { isLoading: isLoadingDelete } = useDeleteBoard();

  return (
    <DeleteConfirm title={title} id={id} sideOffset={15}>
      <Button
        variant="ghost"
        disabled={isLoadingDelete}
        className="rounded-non w-full h-auto p-2 px-5 justify-start font-normal"
      >
        Delete Board
      </Button>
    </DeleteConfirm>
  );
};

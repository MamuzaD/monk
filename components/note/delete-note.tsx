import { Button } from "@/components/ui/button";
import { DeleteConfirm } from "./delete-confirm";
import { useDeleteNote } from "@/hooks/use-deletenote";

interface DeleteNoteProps {
  title: string;
  id: string;
}

export const DeleteNote = ({ title, id }: DeleteNoteProps) => {
  const { isLoading } = useDeleteNote();

  return (
    <DeleteConfirm title={title} id={id} sideOffset={15}>
      <Button
        variant="ghost"
        disabled={isLoading}
        className="rounded-non w-full h-auto p-2 px-5 justify-start font-normal"
      >
        Delete Note
      </Button>
    </DeleteConfirm>
  );
};

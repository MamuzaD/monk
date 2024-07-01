import { deleteNote } from "@/actions/note-actions/delete-note";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteNoteProps {
  id: string;
}

export const DeleteNote = ({ id }: DeleteNoteProps) => {

  return (
    <Button
      variant="ghost"
      className="rounded-non w-full h-auto p-2 px-5 justify-start font-normal"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
};

import { deleteNote } from "@/actions/note-actions/delete-note";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useDeleteNote = () => {
  const router = useRouter();

  const { execute, isLoading } = useAction(deleteNote, {
    onSuccess: (note) => {
      toast.success(`Note "${note.title}" deleted`);
      router.push(`/organization/${note.orgId}/notes`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (id: string, title: string, input: string) => {
    execute({ id, title, input });
  };

  return { onDelete, isLoading };
};

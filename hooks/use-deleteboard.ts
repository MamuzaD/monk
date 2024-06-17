import { deleteBoard } from "@/actions/board-actions/delete-board";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useDeleteBoard = () => {
  const router = useRouter();

  const { execute, isLoading } = useAction(deleteBoard, {
    onSuccess: (board) => {
      toast.success(`Board "${board.title}" deleted`);
      router.push(`/organization/${board.orgId}`);
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

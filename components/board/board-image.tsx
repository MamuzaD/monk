import { boardImage } from "@/actions/board-actions/board-image";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { ImageConfirm } from "./image-confirm";

interface BoardImageProps {
  id: string;
}

export const BoardImage = ({ id }: BoardImageProps) => {
  const { execute, fieldErrors, isLoading } = useAction(boardImage, {
    onSuccess: (board) => {
      toast.success(`Board "${board.title}" image updated`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const image = formData.get("image") as string;

    execute({ id, image });
  };

  return (
    <ImageConfirm onSubmit={onSubmit}>
      <Button
        variant="ghost"
        disabled={isLoading}
        className="rounded-non w-full h-auto p-2 px-5 justify-start font-normal"
      >
        Change Image
      </Button>
    </ImageConfirm>
  );
};

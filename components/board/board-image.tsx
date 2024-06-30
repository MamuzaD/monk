import { boardImage } from "@/actions/board-actions/board-image";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { ImageConfirm } from "./image-confirm";
import { RefObject } from "react";

interface BoardImageProps {
  id: string;
  closeRef: RefObject<HTMLButtonElement>;
}

export const BoardImage = ({ id, closeRef }: BoardImageProps) => {
  const { execute, fieldErrors, isLoading } = useAction(boardImage, {
    onSuccess: (board) => {
      toast.success(`Board "${board.title}" image updated`);
      closeRef.current?.click(); //close board options
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const image = formData.get("image") as string;
    const color = formData.get("color") as string;

    if (!color) execute({ id, image });
    if (!image) execute({ id, color });
  };

  return (
    <ImageConfirm onSubmit={onSubmit} errors={fieldErrors}>
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

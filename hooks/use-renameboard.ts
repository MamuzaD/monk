import { Board } from "@prisma/client";
import { useRef, useState } from "react";
import { renameBoard } from "@/actions/board-actions/rename-board";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";

interface UseBoardRenameProps {
  board: Board;
}

export const useBoardRename = ({ board }: UseBoardRenameProps) => {
  const { execute, isLoading } = useAction(renameBoard, {
    onSuccess: (board: Board) => {
      toast.success(`${title} renamed to ${board.title}.`);
      setTitle(board.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(board.title);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const newTitle = formData.get("title") as string;

    if (newTitle === board.title) return disableEditing();

    execute({ title: newTitle, id: board.id });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  return {
    title,
    isEditing,
    isLoading,
    formRef,
    inputRef,
    enableEditing,
    disableEditing,
    onSubmit,
    onBlur,
  };
};

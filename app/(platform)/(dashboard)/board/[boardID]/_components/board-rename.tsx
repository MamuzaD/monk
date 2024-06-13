"use client";

import { Board } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ElementRef, useRef, useState } from "react";
import { FormInput } from "@/components/form/form-input";
import { renameBoard } from "@/actions/board-actions/rename-board";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { Hint } from "@/components/hint";

interface BoardRenameProps {
  board: Board;
}

export const BoardRename = ({ board }: BoardRenameProps) => {
  const { execute } = useAction(renameBoard, {
    onSuccess: (board) => {
      toast.success(`${title} renamed to ${board.title}.`);
      setTitle(board.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(board.title);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title, id: board.id });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing)
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          id="title"
          ref={inputRef}
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-5 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none absolute"
        />
      </form>
    );

  return (
    <Hint
        description="Rename Board"
        className="text-xs font-normal text-neutral-800"
        
      >
    <Button
      onClick={enableEditing}
      className="font-bold text-lg h-auto w-auto -1 px-2"
      variant="transparent"
    >
      
        {title}
    </Button>
    </Hint>
  );
};

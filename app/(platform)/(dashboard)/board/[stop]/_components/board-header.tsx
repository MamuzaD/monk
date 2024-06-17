"use client";

import { Board } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { Hint } from "@/components/hint";
import { useRenameBoard } from "@/hooks/use-renameboard";

interface BoardHeaderProps {
  board: Board;
}

export const BoardHeader = ({ board }: BoardHeaderProps) => {
  const {
    title,
    isEditing,
    formRef,
    inputRef,
    enableEditing,
    onSubmit,
    onBlur,
  } = useRenameBoard({ board });
  
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
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
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
        className="font-bold text-lg h-auto w-auto -1 px-2 py-0.5"
        variant="transparent"
      >
        {title}
      </Button>
    </Hint>
  );
};

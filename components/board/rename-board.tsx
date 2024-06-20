import { Button } from "@/components/ui/button";
import { RenameConfirm } from "./rename-confirm";
import { Board } from "@prisma/client";
import { RefObject } from "react";

interface RenameBoardProps {
  board: Board;
  inputRef: RefObject<HTMLInputElement>;
  formRef: RefObject<HTMLFormElement>;
  onSubmit?: (formData: FormData) => void;
  fieldErrors: any;
  isLoading: boolean;
}

export const RenameBoard = ({
  board,
  inputRef,
  formRef,
  onSubmit,
  fieldErrors,
  isLoading,
}: RenameBoardProps) => {
  return (
    <RenameConfirm
      sideOffset={5}
      board={board}
      formRef={formRef}
      inputRef={inputRef}
      onSubmit={onSubmit}
      fieldErrors={fieldErrors}
      isLoading={isLoading}
    >
      <Button
        disabled={isLoading}
        variant="ghost"
        className="rounded-non w-full h-auto p-2 px-5 justify-start font-normal"
      >
        Rename Board
      </Button>
    </RenameConfirm>
  );
};

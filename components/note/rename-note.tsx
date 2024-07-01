import { Button } from "@/components/ui/button";
import { RenameConfirm } from "./rename-confirm";
import { Note } from "@prisma/client";
import { RefObject } from "react";

interface RenameNoteProps {
  note: Note;
  inputRef: RefObject<HTMLInputElement>;
  formRef: RefObject<HTMLFormElement>;
  onSubmit?: (formData: FormData) => void;
  fieldErrors: any;
  isLoading: boolean;
}

export const RenameNote = ({
  note,
  inputRef,
  formRef,
  onSubmit,
  fieldErrors,
  isLoading,
}: RenameNoteProps) => {
  return (
    <RenameConfirm
      sideOffset={5}
      note={note}
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
        Rename Note
      </Button>
    </RenameConfirm>
  );
};

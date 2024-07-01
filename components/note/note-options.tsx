"use client";

import { MoreHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Note } from "@prisma/client";
import { DeleteNote } from "./delete-note";
import { useRenameNote } from "@/hooks/use-renamenote";
import { RenameNote } from "./rename-note";

interface NoteOptionsProps {
  note: Note;
}

export const NoteOptions = ({ note }: NoteOptionsProps) => {
  const { closeRef, formRef, inputRef, onSubmit, fieldErrors, isLoading } =
    useRenameNote({ note });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-labelledby="note options"
          className="h-auto w-auto p-2 rounded-full bg-transparent"
          variant="ghost"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 py-3 z-[1000] w-auto"
        side="bottom"
        align="start"
      >
        <div className="text-sm font-medium text-center text-neutral-800 dark:text-neutral-200 pb-4">
          Note Actions
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            className="h-auto w-auto p-2 rounded-full absolute top-2 right-2 text-neutral-600 dark:text-neutral-400"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <RenameNote 
         note={note}
         formRef={formRef}
         inputRef={inputRef}
         onSubmit={onSubmit}
         fieldErrors={fieldErrors}
         isLoading={isLoading}
        />
        <DeleteNote title={note.title} id={note.id} />
      </PopoverContent>
    </Popover>
  );
};

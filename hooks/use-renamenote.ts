import { Note } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { renameNote } from "@/actions/note-actions/rename-note";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";

interface UseRenameNoteProps {
  note: Note;
}

export const useRenameNote = ({ note }: UseRenameNoteProps) => {
  const { execute, isLoading, fieldErrors } = useAction(renameNote, {
    onSuccess: (note: Note) => {
      toast.success(`Note "${title}" renamed to "${note.title}"`);
      closeRef?.current?.click();
      setTitle(note.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<ElementRef<"button">>(null); //for popover

  const [title, setTitle] = useState(note.title);
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
    const newTitle = formData.get("title") as string;

    if (newTitle === note.title) return disableEditing();

    execute({ title: newTitle, id: note.id });
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
    closeRef,
    fieldErrors,
    enableEditing,
    disableEditing,
    onSubmit,
    onBlur,
  };
};

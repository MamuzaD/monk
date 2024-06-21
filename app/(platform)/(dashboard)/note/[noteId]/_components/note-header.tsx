import { renameList } from "@/actions/list-actions/rename-list";
import { renameNote } from "@/actions/note-actions/rename-list";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { Note } from "@prisma/client";
import { useState, useRef, ElementRef } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";

interface NoteHeaderProps {
  note: Note;
}

export const NoteHeader = ({ note }: NoteHeaderProps) => {
  const [title, setTitle] = useState(note.title);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { execute, fieldErrors } = useAction(renameNote, {
    onSuccess: (note) => {
      toast.success(`Note "${title}" renamed to "${note.title}"`);
      setTitle(note.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;

    if (title === note.title) return;

    execute({ title, id });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);
  return (
    <form ref={formRef} action={onSubmit} className="flex-1 px-[2px]">
      <input hidden id="id" name="id" defaultValue={note.id} />
      <FormInput
        className="text-5xl h-auto px-[7px] py-1 my-3 border-transparent hover:border-input focus:border-input transition truncate font-medium bg-transparent text-center"
        ref={inputRef}
        onBlur={onBlur}
        id="title"
        type="text"
        placeholder="Change list title..."
        defaultValue={title}
        errors={fieldErrors}
      />
      <button type="submit" hidden />
    </form>
  );
};

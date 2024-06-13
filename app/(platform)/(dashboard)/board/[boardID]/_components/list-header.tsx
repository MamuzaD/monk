"use client";

import { useState, useRef, ElementRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { List } from "@prisma/client";
import { renameList } from "@/actions/rename-list";
import { useAction } from "@/hooks/use-action";
import { FormInput } from "@/components/form/form-input";
import { ListOptions } from "./list-options";

interface ListHeaderProps {
  list: List;
}

export const ListHeader = ({ list }: ListHeaderProps) => {
  const [title, setTitle] = useState(list.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(renameList, {
    onSuccess: (list) => {
      toast.success(`List ${title} renamed to ${list.title}.`);
      setTitle(list.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    console.log(boardId);

    if (title === list.title) return disableEditing();

    execute({ title, id, boardId });
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
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form ref={formRef} action={onSubmit} className="flex-1 px-[2px]">
          <input hidden id="id" name="id" value={list.id} />
          <input hidden id="boardId" name="boardId" value={list.boardId} />
          <FormInput
            className="text-sm px-[7px] py-1 h-7 border-transparent hover:border-input focus:border-input transition truncate font-medium bg-transparent focus:bg-white"
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="Change list title..."
            defaultValue={title}
            errors={fieldErrors}
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {title}
        </div>
      )}
      <ListOptions list={list} onAddCard={() => {}} />
    </div>
  );
};
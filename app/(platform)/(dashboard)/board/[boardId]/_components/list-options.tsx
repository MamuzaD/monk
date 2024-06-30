import { useRef, ElementRef } from "react";
import { List } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { deleteList } from "@/actions/list-actions/delete-list";
import { copyList } from "@/actions/list-actions/copy-list";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FormSubmit } from "@/components/form/form-submit";
import { toast } from "sonner";
import { Hint } from "@/components/hint";

interface ListOptionsProps {
  list: List;
  onAddCard: () => void;
  rename: () => void;
}

export const ListOptions = ({ list, onAddCard, rename }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (list) => {
      toast.success(`List "${list.title}" deleted.`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({ id, boardId });
  };

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (list) => {
      toast.success(`List "${list.title} copied.`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeCopy({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-auto w-auto p-2"
          variant="ghost"
          aria-labelledby="list options"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-800 dark:text-neutral-200 pb-4">
          List Actions
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            className="h-auto w-auto p-2 rounded-full absolute top-2 right-2 text-neutral-700 dark:text-neutral-300"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Add card
        </Button>
        <Button
          onClick={rename}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Rename list
        </Button>
        <form action={onCopy}>
          <input name="id" id="id" defaultValue={list.id} hidden />
          <input
            name="boardId"
            id="boardId"
            defaultValue={list.boardId}
            hidden
          />

          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy list
          </FormSubmit>
        </form>
        <Hint
          description="Permanent action"
          className="text-xs font-normal border-red-500 bg-red-300 text-red-700"
        >
          <form action={onDelete}>
            <input name="id" id="id" defaultValue={list.id} hidden />
            <input
              name="boardId"
              id="boardId"
              defaultValue={list.boardId}
              hidden
            />

            <FormSubmit
              variant="ghost"
              className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            >
              Delete this list
            </FormSubmit>
          </form>
        </Hint>
      </PopoverContent>
    </Popover>
  );
};

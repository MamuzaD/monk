"use client";

import { X } from "lucide-react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FormSubmit } from "@/components/form/form-submit";
import { useDeleteBoard } from "@/hooks/use-deleteboard";
import { FormInput } from "@/components/form/form-input";

interface DeleteConfirmProps {
  title: string;
  id: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

export const DeleteConfirm = ({
  title,
  id,
  children,
  side = "bottom",
  sideOffset = 0,
  align,
}: DeleteConfirmProps) => {
  const { onDelete, isLoading: isLoadingDelete } = useDeleteBoard();

  const onSubmit = (formData: FormData) => {
    const input = formData.get("title") as string;

    onDelete(id, title, input);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side={side}
        sideOffset={sideOffset}
        align={align}
        className="w-96"
      >
        <div className="text-sm font-medium text-center text-neutral-800">
          Delete Board
          <Separator className="my-2" />
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600 rounded-full"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
            <FormInput
              disabled={isLoadingDelete}
              id="title"
              label={`Enter "${title}" to confirm`}
              type="text"
            />
          <FormSubmit className="w-full mt-10" variant="destructive">Delete Board</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
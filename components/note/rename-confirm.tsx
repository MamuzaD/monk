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
import { FormInput } from "@/components/form/form-input";
import { Note } from "@prisma/client";
import { RefObject } from "react";

interface RenameConfirmProps {
  note: Note;
  inputRef: RefObject<HTMLInputElement>;
  formRef: RefObject<HTMLFormElement>;
  onSubmit?: (formData: FormData) => void;
  fieldErrors: any;
  isLoading: boolean;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

export const RenameConfirm = ({
  note,
  inputRef,
  formRef,
  onSubmit,
  fieldErrors,
  isLoading,
  children,
  side = "bottom",
  sideOffset = 0,
  align,
}: RenameConfirmProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side={side}
        sideOffset={sideOffset}
        align={align}
        className="w-96 z-[9999]"
      >
        <div className="text-sm font-medium text-center text-neutral-800 dark:text-neutral-200">
          Rename Note
          <Separator className="my-2" />
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600 dark:text-neutral-400 rounded-full"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} ref={formRef} className="space-y-4">
          <FormInput
            disabled={isLoading}
            id="title"
            ref={inputRef}
            errors={fieldErrors}
            label={`Rename "${note.title}" to ...`}
            type="text"
          />
          <FormSubmit className="w-full mt-10">Rename Note</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

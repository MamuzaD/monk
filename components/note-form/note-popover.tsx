"use client";

import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { X } from "lucide-react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { useStripeModal } from "@/hooks/use-stripe-modal";
import { createNote } from "@/actions/create-note";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { FormInput } from "../form/form-input"; 
import { FormSubmit } from "../form/form-submit"; 

interface NotePopoverProps {
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

export const NotePopover = ({
  children,
  side = "bottom",
  sideOffset = 0,
  align,
}: NotePopoverProps) => {
  const stripeModal = useStripeModal();
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute, fieldErrors } = useAction(createNote, {
    onSuccess: (note) => {
      toast.success(`Note "${note.title}" created`);
      closeRef.current?.click();
      router.push(`/note/${note.id}`);
    },
    onError: (error) => {
      toast.error(error);
      stripeModal.onOpen();
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side={side}
        sideOffset={sideOffset}
        align={align}
        className=" w-96"
      >
        <div className="text-sm font-medium text-center text-neutral-800">
          Create Note
          <Separator />
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600 rounded-full"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormInput
              id="title"
              label="Note Title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

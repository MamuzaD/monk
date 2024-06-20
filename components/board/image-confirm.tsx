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
import { FormPicker } from "../form/form-picker";

interface ImageConfirmProps {
  onSubmit: (formData: FormData) => void;
  children: React.ReactNode;
}

export const ImageConfirm = ({ onSubmit, children }: ImageConfirmProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent side="bottom" sideOffset={10} className="w-96">
        <div className="text-sm font-medium text-center text-neutral-800">
          Change Image
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
          <FormPicker id="image"/>
          <FormSubmit className="w-full mt-10">Change Image</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
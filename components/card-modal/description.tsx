"use client";

import { ElementRef, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/card-actions/update-card";
import { CardWList } from "@/types";
import { Skeleton } from "../ui/skeleton";
import { AlignLeft } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormTextarea } from "../form/form-textarea";
import { FormSubmit } from "../form/form-submit";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface DescriptionProps {
  card: CardWList;
}

export const Description = ({ card }: DescriptionProps) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") disableEditing();
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (card) => {
      queryClient.invalidateQueries({
        queryKey: ["card", card.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", card.id],
      });
      toast.success(`Card "${card.title}" updated`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;

    console.log(description, boardId);
    execute({ boardId, description, id: card.id });
  };

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Description</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className="space-y-2">
            <FormTextarea
              id="description"
              name="description"
              ref={textareaRef}
              className="w-full mt-2"
              placeholder="Add a description..."
              errors={fieldErrors}
              defaultValue={card.description || undefined}
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit>Save</FormSubmit>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-20 bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
          >
            {card.description || "Add a description..."}
          </div>
        )}
      </div>
    </div>
  );
};

Description.Skeleton = function SkeletonDescription() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
        <Skeleton className="h-20 w-full mb-2 bg-neutral-200" />{" "}
        {/* h should be 78 px? */}
      </div>
    </div>
  );
};

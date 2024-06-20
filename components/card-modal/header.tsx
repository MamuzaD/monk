"use client";

import { ElementRef, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Layout } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/card-actions/update-card";
import { CardWList } from "@/types";
import { FormInput } from "../form/form-input";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";

interface HeaderProps {
  card: CardWList;
}

export const Header = ({ card }: HeaderProps) => {
  const { execute } = useAction(updateCard, {
    onSuccess: (card) => {
      queryClient.invalidateQueries({
        queryKey: ["card", card.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", card.id],
      });
      toast.success(`Renamed "${title}" to "${card.title}"`);
      setTitle(card.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const queryClient = useQueryClient();
  const params = useParams();

  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(card.title);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;

    if (title === card.title) return;

    execute({ boardId, title, id: card.id });
  };

  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="h-5 w-5 mt-1 text-neutral-700 dark:text-neutral-300" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            id="title"
            ref={inputRef}
            defaultValue={title}
            onBlur={onBlur}
            className="font-semibold text-xl px-1 text-neutral-700 dark:text-neutral-300 dark:bg-neutral-950 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white peer-focus-within:border-input mb-0.5 truncate"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{card.list.title}</span>
        </p>
      </div>
    </div>
  );
};

Header.Skeleton = function SkeletonHeader() {
  return (
    <div className="flex items-start gap-x-3 mb-6 ">
      <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4 bg-neutral-200" />
      </div>
    </div>
  );
};

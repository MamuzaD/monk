"use client";

import { MoreHorizontal, X } from "lucide-react";
import { deleteBoard } from "@/actions/board/delete-board";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const router = useRouter();

  const { execute, isLoading } = useAction(deleteBoard, {
    onSuccess: (board) => {
      toast.success(`Board "${board.title}" deleted`);
      router.push(`/organization/${board.orgId}`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-auto w-auto p-2 rounded-full"
          variant="transparent"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board Actions
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 rounded-full absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          disabled={isLoading}
          onClick={onDelete}
          className="rounded-non w-full h-auto p-2 px-5 justify-start font-normal text-sm"
        >
          Delete Board
        </Button>
      </PopoverContent>
    </Popover>
  );
};

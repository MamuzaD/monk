import { HelpCircle, LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { BoardPopover } from "@/components/form/board-popover";
import { Hint } from "@/components/hint";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { MAX_FREE_BOARDS } from "@/constants/boards";
import { getAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";
import { BoardOptions } from "../../../board/[boardId]/_components/board-options";

export const BoardList = async () => {
  const { orgId } = auth();

  if (!orgId) return redirect("/select-org");

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const availableCount = await getAvailableCount();
  const isPro = await checkSubscription();

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <LayoutDashboard className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <div
            className="relative  rounded-sm overflow-hidden shadow-md"
            key={board.id}
          >
            <div className="absolute top-2 right-2 z-10">
              <BoardOptions board={board} />
            </div>
            <Link
              href={`/board/${board.id}`}
              style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
              className="relative aspect-video bg-no-repeat bg-center bg-cover bg-neutral-400 rounded-sm h-full w-full p-2 overflow-hidden block "
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition" />
              <p className="absolute bottom-2 left-2 right-2 text-white font-light truncate">
                {board.title}
              </p>
            </Link>
          </div>
        ))}

        <BoardPopover side="right" sideOffset={10}>
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-60 transition"
          >
            <p className="text-sm">Create New Board</p>
            <span className="text-sm">
              {isPro
                ? "Unlimited"
                : `${MAX_FREE_BOARDS - availableCount} remaining`}
            </span>
            <Hint
              sideOffset={40}
              description={`Free workspaces can have up to 3 open boards, upgrade for unlimited.`}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </BoardPopover>
      </div>
    </div>
  );
};

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Skeleton className="h-8 w-8 mr-2" />
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <Skeleton className="aspect-video h-full w-full p-2" />
        <Skeleton className="aspect-video h-full w-full p-2" />
        <Skeleton className="aspect-video h-full w-full p-2" />
        <Skeleton className="aspect-video h-full w-full p-2" />
      </div>
    </div>
  );
};

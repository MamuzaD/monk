import { HelpCircle, Notebook } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "@/components/hint";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export const NoteList = async () => {
  const { orgId } = auth();

  if (!orgId) return redirect("/select-org");

  const notes = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <Notebook className="h-6 w-6 mr-2" />
        Your Notes
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {notes.map((note) => (
            <Link
              key={note.id}
              href={`/note/${note.id}`}
              style={{ backgroundImage: `url(${note.imageThumbUrl})` }}
              className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-neutral-400 rounded-sm h-full w-full p-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition" />
              <p className="relative font-light text-white top-3/4">
                {note.title}
              </p>
            </Link>
        ))}

        <FormPopover side="right" sideOffset={10}>
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-60 transition"
          >
            <p className="text-sm">Create New Note</p>
            <span className="text-sm">5 remaining</span>
            <Hint
              sideOffset={40}
              description={`Free workspaces can have up to 5 open boards, upgrade for unlimited.`}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

NoteList.Skeleton = function SkeletonNoteList() {
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

import { HelpCircle, Notebook } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { Hint } from "@/components/hint";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { NotePopover } from "@/components/note-form/note-popover";

export const NoteList = async () => {
  const { orgId } = auth();

  if (!orgId) return redirect("/select-org");

  const notes = await db.note.findMany({
    where: {
      orgId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700 dark:text-neutral-300">
        <Notebook className="h-6 w-6 mr-2" />
        Your Notes
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {notes.map((note) => (
          <Link
            key={note.id}
            href={`/note/${note.id}`}
            className="group relative aspect-[4/6] bg-no-repeat bg-center bg-cover bg-muted rounded-sm p-2 overflow-hidden shadow-md"
          >
            <div className="absolute inset-0 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-900/40 transition" />
            <p className="relative font-bold text-neutral-800 dark:text-neutral-200 top-1">
              {note.title}
            </p>
          </Link>
        ))}

        <NotePopover side="right" sideOffset={10}>
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-neutral-300 dark:bg-muted  rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-60 transition"
          >
            <p className="text-sm">Create New Note</p>
            <span className="text-sm">3 remaining</span>
            <Hint
              sideOffset={40}
              description={`Free workspaces can have up to 3 open notes, upgrade for unlimited.`}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </NotePopover>
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

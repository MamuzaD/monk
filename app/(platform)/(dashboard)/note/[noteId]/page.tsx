import { NoteHeader } from "./_components/note-header";
import { Editor } from "./_components/editor";
import { db } from "@/lib/db";
import { useOrganization } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface NoteIdProps {
  params: {
    noteId: string;
  };
}

export default async function NoteIdPage({ params }: NoteIdProps) {
  const { orgId } = auth();

  if (!orgId) redirect("/select-org");

  const note = await db.note.findUnique({
    where: {
      orgId,
      id: params.noteId,
    },
  });

  if(!note) redirect(`/organization/${orgId}/notes`)

  return (
    <div className="">
      <Editor note={note} />
    </div>
  );
}

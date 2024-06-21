import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Sidebar } from "./_components/sidebar";

export async function generateMetadata({
  params,
}: {
  params: { noteId: string };
}) {
  const { orgId } = auth();

  if (!orgId) return { title: "Note" };

  const note = await db.note.findUnique({
    where: {
      id: params.noteId,
      orgId: orgId,
    },
  });

  return {
    title: note?.title,
  };
}

const NoteIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { noteId: string };
}) => {
  const { orgId } = auth();

  if (!orgId) redirect("/select-org");

  const notes = await db.note.findMany({
    where: {
      orgId: orgId,
    },
  });

  return (
    <main className="pt-16 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
      <div className="flex gap-x-7">
        <div className="w-64 shrink-0 hidden md:block">
          <Sidebar notes={notes} />
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </main>
  );
};

export default NoteIdLayout;

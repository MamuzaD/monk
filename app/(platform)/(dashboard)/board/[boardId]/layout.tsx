import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { BoardNavbar } from "./_components/board-navbar";
import { NoteSidebar } from "./_components/note-sidebar";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();

  if (!orgId) return { title: "Board" };

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });
  return {
    title: board?.title,
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  const { orgId } = auth();

  if (!orgId) redirect("/select-org");

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) notFound();

  return (
    <div
      style={
        board.color
          ? { backgroundColor: board.color }
          : { backgroundImage: `url(${board.imageFullUrl})` }
      }
      className="relative h-full bg-no-repeat bg-cover bg-center"
    >
      <BoardNavbar board={board} />
      <div className="absolute inset-0 bg-black/20" />
      <main className="relative pt-28 h-full">
        <NoteSidebar />
        {children}
        {board.imageLinkHTML ? (
          <div className=" absolute bottom-1 right-4 text-white p-1 bg-black/50">
            <Link
              href={board.imageLinkHTML}
              target="_blank"
              className="hover:underline"
            >
              {board.imageUsername}
            </Link>{" "}
            on{" "}
            <Link
              href="https://unsplash.com/"
              target="_blank"
              className="hover:underline"
            >
              Unsplash
            </Link>
          </div>
        ) : (
          <></>
        )}
      </main>
    </div>
  );
};

export default BoardIdLayout;

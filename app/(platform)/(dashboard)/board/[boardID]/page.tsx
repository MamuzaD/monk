import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ListContainer } from "./_components/list-container";

interface BoardIdProps {
  params: {
    boardID: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdProps) => {
  const { orgId } = auth();

  if (!orgId) redirect("/select-org");

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardID,
      board: {
        orgId,
      },
    },
    include: {
      Cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    }
  });

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer boardId={params.boardID} data={lists} />
    </div>
  );
};

export default BoardIdPage;
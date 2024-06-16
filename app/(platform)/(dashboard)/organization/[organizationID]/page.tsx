import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs/server";
import { Info } from "./_components/info";
import { BoardList } from "./_components/board-list";

export async function generateMetadata() {
  const { orgSlug } = auth();

  return {
    title: orgSlug,
  };
}

export default function OrganizationIDPage() {
  return (
    <div className="w-full mb-20 ">
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
}

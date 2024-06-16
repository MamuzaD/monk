import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info";
import { NoteList } from "../_components/note-list";

export default function NotePage() {
  return (
    <div className="w-full mb-20 ">
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<NoteList.Skeleton />}>
          <NoteList />
        </Suspense>
      </div>
    </div>
  );
}

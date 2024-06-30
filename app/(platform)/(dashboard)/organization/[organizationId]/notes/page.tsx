import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info";
import { NoteList } from "../_components/note-list";
import { checkSubscription } from "@/lib/subscription";

export default async function NotePage() {
    const isPro = await checkSubscription();

  return (
    <div className="w-full mb-20 ">
      <Info isPro={isPro}/>
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<NoteList.Skeleton />}>
          <NoteList />
        </Suspense>
      </div>
    </div>
  );
}

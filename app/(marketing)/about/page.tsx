import { Separator } from "@/components/ui/separator";

export default function AboutPage(){
  return (
    <div className="mt-48 flex flex-col items-center justify-center text-center">
      <h1 className="font-bold text-3xl md:text-6xl">About Monk</h1>
      <Separator className="mt-3 w-3/4" />
      <div className="text-xl md:text-2xl mt-10 w-1/2 [&>p]:mt-8">
      Monk is made to fix simple problems such as kanban boards and note management systems and merge them into one.
      </div>
    </div>
  );
};


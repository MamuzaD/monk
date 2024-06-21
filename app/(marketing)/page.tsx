import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="pt-24 flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-3xl md:text-6xl text-center pt-9  mb-6 font-extrabold tracking-widest">
          Monk
        </h1>
        <h2 className="text-lg md:text-xl text-center mb-6 font-medium text-muted-foreground">
          Minimal | Organized | Notes | Kanban
        </h2>
      </div>
      <Button variant="secondary" className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Continue ahead</Link>
      </Button>
      <div className="mt-96">
        <h1>
          Simple
        </h1>
      </div>
    </div>
  );
}

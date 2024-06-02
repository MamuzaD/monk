import { Button } from "@/components/ui/button";
import localFont from "next/font/local"
import { PT_Sans } from "next/font/google";
import { Medal } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../../public/fonts/Inter-400.woff2"
});

const textFont = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"]
});


const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className={cn("flex items-center justify-center flex-col", headingFont.className)}>
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          No 1 task management
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          Trello Clone
        </h1>
        <div className="text-3xl md:text-6xl text-center bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-f">
          Dumb subtitle.
        </div>
      </div>
      <div className={cn("text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl mx-auto", textFont.className)}>
        collaborate, blah blah blah. kfkasdkfjakjdsklf asfkjaskdfj asdfkaklsdf afsdkkj asdfkjkajsdfkas work with trello clone.
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">
          signup
        </Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
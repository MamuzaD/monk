import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../public/fonts/Inter-400.woff2",
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-80 transition items-center gap-x-2 hidden md:flex">
        <Image src="/logo.svg" alt="logo" height={30} width={30} />
        <p className={cn("text-lg text-neutral-700 pb-1", headingFont)}>
          Min Kanban
        </p>
      </div>
    </Link>
  );
};

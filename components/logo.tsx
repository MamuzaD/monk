import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-80 transition items-center gap-x-2 hidden md:flex">
        <Image src="/logo.svg" alt="logo" height={30} width={30} />
        <p className="text-lg font-extrabold text-neutral-700 pb-1">
          Min Kanban
        </p>
      </div>
    </Link>
  );
};

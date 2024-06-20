import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <p className="text-lg font-extrabold pb-1 tracking-wider hover:opacity-80 transition">
        Monk
      </p>
    </Link>
  );
};

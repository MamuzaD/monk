"use client";

import { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {

  const scrollToFeatures = useCallback(() => {
    const section = document.getElementById("features");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <div className="pt-40 md:pt-24 flex items-center justify-center flex-col">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-3xl md:text-6xl text-center pt-9  mb-6 font-extrabold tracking-widest">
            Monk
          </h1>
          <h2 className="text-lg md:text-xl text-center mb-6 font-medium text-muted-foreground">
            Minimal | Organized | Notes | Kanban
          </h2>
        </div>
        <div className="flex flex-col justify-between md:h-96 items-center">
          <Button variant="secondary" className="mt-6" size="lg" asChild>
            <Link href="/sign-up">Continue ahead</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:flex hidden justify-center items-center rounded-full animate-bounce"
            onClick={scrollToFeatures}
          >
            <ArrowDown className="h-8 w8" />
          </Button>
        </div>
      </div>
      <div
        className="max-w-5xl mx-auto py-12 px-4 mt-32 scroll-m-16"
        id="features"
      >
        <h1 className="text-xl md:text-3xl text-center mb-8 font-extrabold tracking-wide">
          Kanban Style Boards
        </h1>
        <Image
          loading="eager"
          width={1900}
          height={900}
          src="/images/board.webp"
          alt="Kanban Style Boards Showcase"
          className="rounded-lg shadow-lg object-cover mb-12 hover:shadow-2xl"
        />
        <h1 className="text-xl md:text-3xl text-center mb-8 font-extrabold tracking-wide ">
          Block Based Notes
        </h1>
        <Image
          loading="eager"
          width={1920}
          height={1080}
          src="/images/notes.webp"
          alt="Block Based Notes showcase"
          className="rounded-lg shadow-lg object-cover hover:shadow-2xl"
        />
      </div>
    </>
  );
}

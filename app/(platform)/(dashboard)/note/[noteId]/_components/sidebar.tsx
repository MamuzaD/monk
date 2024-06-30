"use client";

import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import { Note } from "@prisma/client";
import { NotePopover } from "@/components/note-form/note-popover";

interface SidebarProps {
  notes: Note[];
  storageKey?: string;
}

export const Sidebar = ({
  storageKey = "sidebar-state",
  notes,
}: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) acc.push(key);

      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  return (
    <div className="shadow-md rounded-md">
      <div className="font-medium text-s flex items-center mb-1">
        <span className="pl-4 ">Notes</span>
        <NotePopover>
          <Button
            asChild
            type="button"
            size="icon"
            variant="ghost"
            className="ml-auto mr-1 h-9 w-9 p-2.5"
          >
              <Plus className="h-4 w-4" />
          </Button>
        </NotePopover>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2 pb-2"
      >
        {notes.map((note) => (
          <Link
            key={note.id}
            href={`/note/${note.id}`}
            className="flex flex-col my-2 ml-3 hover:opacity-60 transition-all"
          >
            <div className="flex flex-row py-1 px-2 items-center">
              <FileText className="h-4 w-4 mr-2" />
              <span>{note.title}</span>
            </div>
          </Link>
        ))}
      </Accordion>
    </div>
  );
};

"use client";
import { Note } from "@prisma/client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { NoteHeader } from "./note-header";

interface EditorProps {
  note: Note;
}

export const Editor = ({ note }: EditorProps) => {
  const { theme } = useTheme();

  // Creates a new editor instance.
  const editor = useCreateBlockNote();


  return ( 
    <>
    <NoteHeader note={note} />
    <BlockNoteView
      editor={editor}
      theme={theme === "dark" ? "dark" : "light"}
    />
    </>
  );
};

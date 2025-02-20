"use client";
import { Note } from "@prisma/client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { NoteHeader } from "./note-header";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { updateNote } from "@/actions/note-actions/update-note";
import { toast } from "sonner";
import { debounce } from "@/lib/debounce";

interface EditorProps {
  note: Note;
}

export const Editor = ({ note }: EditorProps) => {
  const { theme } = useTheme();
  const { execute } = useAction(updateNote, {
    onSuccess: () => {
      toast.success("Note saved");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");

  const loadFromDatabase = async () => {
    const storageString = note.content;
    return storageString
      ? (JSON.parse(storageString) as PartialBlock[])
      : undefined;
  };

  useEffect(() => {
    const loadFromDatabase = async () => {
      const storageString = note.content;
      return storageString
        ? (JSON.parse(storageString) as PartialBlock[])
        : undefined;
    };

    loadFromDatabase().then((content) => {
      setInitialContent(content);
    });
  }, [note.content]);

  const saveDebounced = useMemo(() => {
    const saveToDatabase = async (jsonBlocks: Block[]) => {
      const content = JSON.stringify(jsonBlocks);
      await execute({ id: note.id, content: content });
    };

    return debounce((jsonBlocks: Block[]) => {
      saveToDatabase(jsonBlocks);
    }, 2500);
  }, [note.id, execute]);

  const editor = useMemo(() => {
    if (initialContent === "loading") return undefined;
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent]);

  if (!editor) {
    return (
      <>
        <NoteHeader.Skeleton />
        <Editor.Skeleton />
      </>
    );
  }

  // track the cursor position
  const saveWithCursor = () => {
    const textCursorPosition = editor?.getTextCursorPosition();

    saveDebounced(editor.document);

    // restore the cursor position after saving
    if (textCursorPosition && editor) {
      editor.setTextCursorPosition(textCursorPosition.block, "end");
    }
  };

  return (
    <>
      <NoteHeader note={note} />
      <BlockNoteView
        editor={editor}
        theme={theme === "dark" ? "dark" : "light"}
        onChange={() => {
          saveWithCursor();
        }}
        className="bg-white dark:bg-[#1F1F1F] pt-4 pb-2 rounded-lg"
      />
    </>
  );
};

Editor.Skeleton = function SkeletonEditor() {
  return (
    <div className="flex flex-col items-center">
      <Skeleton className="md:h-[1200px] md:w-[900px] w-[22rem] h-[32rem] mt-5" />
    </div>
  );
};

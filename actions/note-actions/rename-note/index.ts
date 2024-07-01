"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { RenameNote } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ENTITY_TYPE, ACTION } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "unauthorized to rename" };

  const { title, id } = data;
  let note;

  try {
    note = await db.note.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    });

    await createAuditLog({
      entityId: note.id,
      entityTitle: note.title,
      entityType: ENTITY_TYPE.NOTE,
      action: ACTION.RENAME,
    });
  } catch (error) {
    return { error: "Database error when renaming note"};
  }

  revalidatePath(`/note/${id}`);
  return { data: note };
};

export const renameNote = createSafeAction(RenameNote, handler);

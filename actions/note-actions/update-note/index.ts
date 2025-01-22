"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { UpdateNote } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized to update" };

  const { id, content } = data;
  let note;

  try {
    note = await db.note.update({
      where: {
        id,
        orgId,
      },
      data: {
        content,
      },
    });
  } catch (error) {
    return { error: "Database error when updating" };
  }

  revalidatePath(`/note/${id}`);
  return { data: note };
};

export const updateNote = createSafeAction(UpdateNote, handler);

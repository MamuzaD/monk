"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { DeleteNote } from "./schema";
import { decrementAvailableCount } from "@/lib/note-limit";
import { checkSubscription } from "@/lib/subscription";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized to delete note" };

  const isPro = await checkSubscription();
  const { id, title, input } = data;
  if (title !== input) return { error: "Input is not board title" };
  
  let note;
  try {
    note = await db.note.delete({
      where: {
        id,
        orgId,
      },
    });

    if (!isPro) await decrementAvailableCount();

    await createAuditLog({
      entityId: note.id,
      entityTitle: note.title,
      entityType: ENTITY_TYPE.NOTE,
      action: ACTION.DELETE,
    });
    
  } catch (error) {
    return { error: "Database error when deleting note" };
  }


  console.log("weird");
  revalidatePath(`/organization/${orgId}/notes`);
  return { data: note };
};

export const deleteNote = createSafeAction(DeleteNote, handler);

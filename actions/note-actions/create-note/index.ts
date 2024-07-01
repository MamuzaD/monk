"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateNote } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ENTITY_TYPE, ACTION } from "@prisma/client";
import { incrementAvailableCount, hasAvailableCount } from "@/lib/note-limit";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "unauthorized to create" };

  const canCreate = await hasAvailableCount();
  const isPro = await checkSubscription();
  if (!canCreate && !isPro) return { error: "Reached max note limit" };
  const { title } = data;

  let note;

  try {
    note = await db.note.create({
      data: {
        title,
        orgId,
        content: "",
      },
    });

    if (!isPro) await incrementAvailableCount();

    await createAuditLog({
      entityId: note.id,
      entityTitle: note.title,
      entityType: ENTITY_TYPE.NOTE,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return { error: "Database error when creating note" };
  }

  revalidatePath(`/note/${note.id}`);
  return { data: note };
};

export const createNote = createSafeAction(CreateNote, handler);

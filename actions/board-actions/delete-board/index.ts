"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { DeleteBoard } from "./schema";
import { decrementAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized to delete board" };

  const isPro = await checkSubscription();
  const { id, title, input } = data;
  if (title !== input) return { error: "Input is not board title" };

  let board;
  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });

    if (!isPro) await decrementAvailableCount();

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return { error: "Database error when deleting" };
  }

  revalidatePath(`/organization/${orgId}`);
  return { data: board };
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);

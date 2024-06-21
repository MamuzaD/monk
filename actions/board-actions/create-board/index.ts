"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ENTITY_TYPE, ACTION } from "@prisma/client";
import { incrementAvailableCount, hasAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "unauthorized to create" };

  const canCreate = await hasAvailableCount();
  const isPro = await checkSubscription();
  if (!canCreate && !isPro) return { error: "Reached max board limit" };
  let { title, image, color } = data;

  if (!image && !color)
    return { error: "Missing image and color fields, failed to create board" };

  let board;

  try {
    if (image) {
      const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUsername,
      ] = image.split("|");

      board = await db.board.create({
        data: {
          title,
          orgId,
          imageId,
          imageFullUrl,
          imageLinkHTML,
          imageThumbUrl,
          imageUsername,
        },
      });
    } else {
      board = await db.board.create({
        data: {
          title,
          orgId,
          color,
        },
      });
    }

    if (!isPro) await incrementAvailableCount();

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    console.log(error);
    return { error: "Database error when creating" };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);

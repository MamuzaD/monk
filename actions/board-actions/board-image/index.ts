"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { BoardImage } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ENTITY_TYPE, ACTION } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized to change image" };

  const { id, image, color } = data;

  let board;

  try {
    if (image) {
    let color = null; //delete previous value
      const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUsername,
      ] = image.split("|");

      board = await db.board.update({
        where: {
          id,
          orgId,
        },
        data: {
          color,
          imageId,
          imageThumbUrl,
          imageFullUrl,
          imageLinkHTML,
          imageUsername,
        },
      });
    } else {
      //delete previous values
      const imageId = null,
        imageThumbUrl = null,
        imageFullUrl = null,
        imageLinkHTML = null,
        imageUsername = null;

      board = await db.board.update({
        where: {
          id,
          orgId,
        },
        data: {
          color,
          imageFullUrl,
          imageId,
          imageLinkHTML,
          imageThumbUrl,
          imageUsername,
        },
      });
    }

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    return { error: "Database error when updating board image" };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const boardImage = createSafeAction(BoardImage, handler);

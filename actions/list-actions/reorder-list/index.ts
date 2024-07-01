"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { ReorderList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized to reorder lists" };

  const { items, boardId } = data;
  let lists;

  try {
    const transcation = items.map((list) =>
      db.list.update({
        where: {
          id: list.id,
          board: {
            orgId,
          },
        },
        data: {
          order: list.order,
        },
      })
    );

    lists = await db.$transaction(transcation);
  } catch (error) {
    return { error: "Database error when moving lists." };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: lists };
};

export const reorderList = createSafeAction(ReorderList, handler);

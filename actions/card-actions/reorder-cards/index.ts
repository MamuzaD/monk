"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { ReorderCards } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized to reorder cards" };

  const { items, boardId } = data;
  let cards;

  try {
    const transcation = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },  
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    );

    cards = await db.$transaction(transcation);
  } catch (error) {
    return { error: "Database erorr when moving cards" };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: cards };
};

export const reorderCards = createSafeAction(ReorderCards, handler);

import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { MAX_FREE_NOTES } from "@/constants/max-amount";

export const incrementAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) throw new Error("Unauthorized");

  const noteLimit = await db.noteLimit.findUnique({
    where: { orgId },
  });

  if (noteLimit) {
    await db.noteLimit.update({
      where: { orgId },
      data: { count: noteLimit.count + 1 },
    });
  } else {
    await db.noteLimit.create({
      data: { orgId, count: 1 },
    });
  }
};

export const decrementAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) throw new Error("Unauthorized");

  const noteLimit = await db.noteLimit.findUnique({
    where: { orgId },
  });

  if (noteLimit) {
    await db.noteLimit.update({
      where: { orgId },
      data: { count: noteLimit.count > 0 ? noteLimit.count - 1 : 0 },
    });
  } else {
    await db.noteLimit.create({
      data: { orgId, count: 1 },
    });
  }
};

export const hasAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) throw new Error("Unauthorized");

  const noteLimit = await db.noteLimit.findUnique({
    where: { orgId },
  });

  if (!noteLimit || noteLimit.count < MAX_FREE_NOTES) return true;

  return false;
};

export const getAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) return 0;

  const noteLimit = await db.noteLimit.findUnique({
    where: { orgId },
  });

  if (!noteLimit) return 0;

  return noteLimit.count;
};

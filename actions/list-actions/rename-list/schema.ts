import { z } from "zod";

export const RenameList = z.object({
  title: z.string(),
  id: z.string(),
  boardId: z.string(),
});

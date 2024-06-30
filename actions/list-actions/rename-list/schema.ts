import { z } from "zod";

export const RenameList = z.object({
  title: z.string({
    required_error: "Title required",
    invalid_type_error: "Title required",
  }),
  id: z.string(),
  boardId: z.string(),
});

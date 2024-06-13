import { z } from "zod";

export const CreateList = z.object({
  title: z
    .string({
      required_error: "Title required",
      invalid_type_error: "Title required",
    }),
  boardId: z.string(),
});

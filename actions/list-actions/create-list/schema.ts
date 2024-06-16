import { z } from "zod";

export const CreateList = z.object({
  title: z
    .string({
      required_error: "Title required",
      invalid_type_error: "Title required",
    })
    .min(1, {
      message: "List title too shoort",
    }),
  boardId: z.string(),
});

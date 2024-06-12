import { z } from "zod";

export const CreateBoard = z.object({
  title: z
    .string({
      required_error: "Title required",
      invalid_type_error: "Title required",
    })
    .min(3, {
      message: "Title must be >3 characters",
    }),
});

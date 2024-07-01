import { z } from "zod";

export const RenameNote = z.object({
  title: z
    .string({
      required_error: "Title required",
      invalid_type_error: "Title required",
    })
    .min(3, {
      message: "Title too short",
    }).max(20, {
      message: "Title too long",
    }),
  id: z.string(),
});

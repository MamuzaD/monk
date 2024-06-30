import { z } from "zod";

export const CreateNote = z.object({
  title: z
    .string({
      required_error: "Title required",
      invalid_type_error: "Title required",
    })
    .min(3, {
      message: "Title too short",
    }),
});

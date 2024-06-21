import { z } from "zod";

export const CreateBoard = z.object({
  title: z
    .string({
      required_error: "Title required",
      invalid_type_error: "Title required",
    })
    .min(3, {
      message: "Title too short",
    }),
  image: z.string({ invalid_type_error: "Invalid type for image" }).optional(),
  color: z.string({ invalid_type_error: "Invalid type for color" }).optional(),
});

import { z } from "zod";

export const CreateBoard = z
  .object({
    title: z
      .string({
        required_error: "Title required",
        invalid_type_error: "Title required",
      })
      .min(3, {
        message: "Title too short",
      }),
    image: z.string().nullable().optional(),
    color: z.string().nullable().optional(),
  })
  .refine((z) => z.image || z.color, {
    message: "Image or color required",
    path: ["image", "color"],
  });
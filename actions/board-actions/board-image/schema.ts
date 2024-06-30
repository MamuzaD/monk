import { z } from "zod";

export const BoardImage = z
  .object({
    id: z.string(),
    image: z.string().nullable().optional(),
    color: z.string().nullable().optional(),
  })
  .refine((z) => z.image || z.color, {
    message: "Image or color required",
    path: ["image", "color"],
  });

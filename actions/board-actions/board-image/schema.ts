import { z } from "zod";

export const BoardImage = z.object({
  id: z.string(),
  image: z.string({
    required_error: "Image required",
    invalid_type_error: "Image required",
  }),
});

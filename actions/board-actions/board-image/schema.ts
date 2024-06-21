import { z } from "zod";

export const BoardImage = z.object({
  id: z.string(),
  image: z.string({ required_error: "Required" }).optional(),
  color: z.string({ invalid_type_error: "Required" }).optional(),
});

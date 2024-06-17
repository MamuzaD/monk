import { z } from "zod";

export const DeleteBoard = z.object({
  id: z.string(),
  title: z.string(),
  input: z.string({
    required_error: "Input required",
    invalid_type_error: "Input required",
  }),
});

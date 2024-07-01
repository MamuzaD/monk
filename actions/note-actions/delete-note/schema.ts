import { z } from "zod";

export const DeleteNote = z.object({
  id: z.string(),
  title: z.string(),
  input: z.string({
    required_error: "Input required",
    invalid_type_error: "Input required",
  }),
});
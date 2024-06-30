import { z } from "zod";


export const UpdateNote = z.object({
  id: z.string(),
  content: z.string(),
});



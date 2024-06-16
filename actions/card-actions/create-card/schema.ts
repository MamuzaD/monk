import { z } from "zod";

export const CreateCard = z.object({
  title: z
    .string({
      required_error: "Title required",
      invalid_type_error: "Title required",
    })
    .min(1, {
      message: "Card title too shoort",
    }),
  boardId: z.string(),
  listId: z.string(),
});

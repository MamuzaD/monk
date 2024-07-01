import { z } from "zod";
import { Note } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { DeleteNote } from "./schema";

export type InputType = z.infer<typeof DeleteNote>;
export type ReturnType = ActionState<InputType, Note>;

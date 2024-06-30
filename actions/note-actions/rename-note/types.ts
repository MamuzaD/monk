import { z } from "zod";
import { Note } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { RenameNote } from "./schema";

export type InputType = z.infer<typeof RenameNote>;
export type ReturnType = ActionState<InputType, Note>;

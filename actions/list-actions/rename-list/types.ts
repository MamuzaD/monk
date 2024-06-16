import { z } from "zod";
import { List } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { RenameList } from "./schema";

export type InputType = z.infer<typeof RenameList>;
export type ReturnType = ActionState<InputType, List>;

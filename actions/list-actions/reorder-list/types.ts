import { z } from "zod";
import { List } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { ReorderList } from "./schema";

export type InputType = z.infer<typeof ReorderList>;
export type ReturnType = ActionState<InputType, List[]>;

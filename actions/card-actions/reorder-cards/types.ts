import { z } from "zod";
import { Card } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { ReorderCards } from "./schema";

export type InputType = z.infer<typeof ReorderCards>;
export type ReturnType = ActionState<InputType, Card[]>;

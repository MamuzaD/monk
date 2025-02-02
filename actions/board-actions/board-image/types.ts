import { z } from "zod";
import { Board } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { BoardImage  } from "./schema";
 
export type InputType = z.infer<typeof BoardImage>;
export type ReturnType = ActionState<InputType, Board>;

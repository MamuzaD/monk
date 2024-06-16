import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface HintProps {
  children: React.ReactNode;
  description: string;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
}


//simplification of shadcn tooltip with props
export const Hint = ({
  children,
  description,
  side = "bottom",
  sideOffset = 0,
  className,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          sideOffset={sideOffset}
          side={side}
          className={cn("text-sm max-w[220px] break-words", className)}
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

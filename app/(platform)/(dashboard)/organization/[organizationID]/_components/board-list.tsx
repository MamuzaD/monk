import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "@/components/hint";
import { HelpCircle, LayoutDashboard } from "lucide-react";

export const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <LayoutDashboard className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <FormPopover side="right" sideOffset={10}>
        <div
          role="button"
          className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-60 transition"
        >
          <p className="text-sm">Create New Board</p>
          <span className="text-sm">5 remaining</span>
          <Hint
            sideOffset={40}
            description={`Free workspaces can have up to 5 open boards, upgrade for unlimited.`}
          >
            <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
          </Hint>
        </div>
        </FormPopover>
      </div>
    </div>
  );
};

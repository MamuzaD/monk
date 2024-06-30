import { format } from "date-fns";
import { AuditLog } from "@prisma/client";
import { generateLogMessage } from "@/lib/generate-log-message";
import { Avatar, AvatarImage } from "../ui/avatar";

interface ActivityItemProps {
  auditLog: AuditLog;
}

export const ActivityItem = ({ auditLog }: ActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={auditLog.userImage} />
      </Avatar>

      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700 dark:text-neutral-300">
            {auditLog.userName}
          </span>{" "}
          {generateLogMessage(auditLog)}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(auditLog.createdAt), "MMM d, yyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  );
};

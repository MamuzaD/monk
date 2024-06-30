"use client";

import { AuditLog } from "@prisma/client";
import { Skeleton } from "../ui/skeleton";
import { ActivityIcon } from "lucide-react";
import { ActivityItem } from "./activity-item";

interface ActivityProps {
  auditLogs: AuditLog[];
}

export const Activity = ({ auditLogs }: ActivityProps) => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <ActivityIcon className="h-5 w-5 mt-0.5 text-neutral-700 dark:text-neutral-300" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2 dark:text-neutral-300">
          Activity
        </p>
        <ol className="mt-2 space-y-4">
          {auditLogs.map((auditLog) => (
            <ActivityItem key={auditLog.id} auditLog={auditLog} />
          ))}
        </ol>
      </div>
    </div>
  );
};

Activity.Skeleton = function SkeletonActivity() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200 dark:bg-neutral-800" />
      <div className="w-full ">
        <Skeleton className="h-6 w-24 mb-2 bg-neutral-200 dark:bg-neutral-800" />
        <Skeleton className="h-10 w-full bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
  );
};

"use client";

import { useQuery } from "@tanstack/react-query";
import { useCardModal } from "@/hooks/use-card-modal";
import { AuditLog } from "@prisma/client";
import { CardWList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { Dialog, DialogContent } from "../ui/dialog";
import { Header } from "./header";
import { Description } from "./description";
import { Actions } from "./actions";
import { Activity } from "./activity";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);

  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardWList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
    enabled: !!id, 
  });

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
    enabled: !!id, 
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header card={cardData} />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description card={cardData} />
              )}

              {!auditLogsData ? (
                <Activity.Skeleton />
              ) : (
                <Activity auditLogs={auditLogsData} />
              )}
            </div>
          </div>
          {!cardData ? <Actions.Skeleton /> : <Actions card={cardData} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

"use client";

import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";

interface SidebarProps {
  storageKey?: string;
}

export const Sidebar = ({ storageKey="sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {});
  const {organization: activeOrganization} = useOrganization();  

  return(
    <div>
      sidebar
    </div>
  );
};

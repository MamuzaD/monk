"use client";

import { ListWCard } from "@/types";
import { ListHeader } from "./list-header";

interface ListItemProps {
  key: string;
  index: number;
  list: ListWCard;
}

export const ListItem = ({ key, index, list }: ListItemProps) => {
  return(
    <li className="shrink-0 h-full w-[272px] select-none">
     <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
      <ListHeader list={list}/>
     </div>
    </li>
  );
};

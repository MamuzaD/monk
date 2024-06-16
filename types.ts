import { List, Card } from "@prisma/client";

export type ListWCard = List & { Cards: Card[] };

export type CardWList = Card & { List: List };


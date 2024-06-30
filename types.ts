import { List, Card } from "@prisma/client";

export type ListWCard = List & { cards: Card[] };

export type CardWList = Card & { list: List };


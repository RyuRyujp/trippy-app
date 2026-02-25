import type { ISODate, UUID } from "@/types/common";

export type Memo = {
  id: UUID;
  tripId: UUID;
  content: string;
  createdAt: string;
};

export type Task = {
  id: UUID;
  tripId: UUID;
  title: string;
  done: boolean;
  dueDate: ISODate | null;
  createdAt: string;
};
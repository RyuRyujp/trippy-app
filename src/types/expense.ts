import type { ISODate, UUID } from "@/types/common";

export type TripMember = {
  id: UUID;
  tripId: UUID;
  name: string;
  createdAt: string;
};

export type Expense = {
  id: UUID;
  tripId: UUID;
  title: string;
  amount: number; // 円
  currency: "JPY";
  paidByMemberId: UUID | null;
  spentOn: ISODate | null;
  createdAt: string;
};

export type Transfer = {
  fromMemberId: UUID;
  toMemberId: UUID;
  amount: number;
};
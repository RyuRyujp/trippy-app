import type { ISODate, UUID } from "@/types/common";

export type Trip = {
  id: UUID;
  title: string;
  city: string | null;
  startDate: ISODate;
  endDate: ISODate;
  coverUrl: string | null;
  createdAt: string;
};

export type TripSummary = Pick<Trip, "id" | "title" | "city" | "startDate" | "endDate" | "coverUrl">;

export type TripTabKey = "itinerary" | "memo_task" | "expense";
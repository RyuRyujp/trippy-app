import type { ISODate, UUID } from "@/types/common";

export type ItineraryItem = {
  id: UUID;
  tripId: UUID;
  dayDate: ISODate;
  timeText: string | null;
  title: string;
  note: string | null;
  createdAt: string;
};
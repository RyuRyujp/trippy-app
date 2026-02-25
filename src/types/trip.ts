export type ISODate = `${number}-${number}-${number}`; // YYYY-MM-DD を想定

export type Trip = {
  id: string;
  title: string;
  city: string | null;
  startDate: ISODate;
  endDate: ISODate;
  coverUrl: string | null;
  createdAt: string; // ISO datetime
};

export type TripSummary = Pick<Trip, "id" | "title" | "city" | "startDate" | "endDate" | "coverUrl">;

export type TripTabKey = "itinerary" | "memo_task" | "expense";
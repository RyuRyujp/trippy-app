export type TripLite = {
  id: string;
  title: string;
  city?: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
};

export const homeMock = {
  trips: [
    { id: "1", title: "Paris Graduation Trip", city: "Paris", startDate: "2026-03-10", endDate: "2026-03-15" },
    { id: "2", title: "London Stopover", city: "London", startDate: "2026-03-09", endDate: "2026-03-10" },
    { id: "3", title: "Bangkok & Taiwan", city: "Bangkok", startDate: "2026-04-05", endDate: "2026-04-12" },
  ] satisfies TripLite[],
} as const;
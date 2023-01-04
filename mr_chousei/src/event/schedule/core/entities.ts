export type AvailabilityEnum = "available" | "maybe" | "unavailable";
export type EventSchedule = {
  id: number;
  times: Date;
  availabilityState: AvailabilityEnum | null;
};

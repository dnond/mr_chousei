import { AvailabilityEnum, EventSchedule } from "./entities";

export const createEventSchedulesPresenter = () => {
  let eventSchedules: EventSchedule[];

  const get = () => {
    return eventSchedules;
  };

  const set = (newEventScheduls: EventSchedule[]) => {
    eventSchedules = newEventScheduls;
  };

  return { get, set };
};

export type EventSchedulesPresenter = ReturnType<
  typeof createEventSchedulesPresenter
>;

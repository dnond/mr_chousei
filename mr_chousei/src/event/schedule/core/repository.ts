import { EventSchedule, AvailabilityEnum } from "./entities";

export const createEventScheduleRepository = () => {
  let eventSchedules: EventSchedule[];

  const init = (initializedEventSchedules: EventSchedule[]) => {
    eventSchedules = initializedEventSchedules;
  };

  const chooseAvailabilityOption = (
    id: number,
    availabilityOption: AvailabilityEnum
  ) => {
    eventSchedules = eventSchedules.map((eventSchedule) => {
      if (eventSchedule.id !== id) {
        return eventSchedule;
      }
      return { ...eventSchedule, availabilityState: availabilityOption };
    });
  };

  const getAll = () => {
    return eventSchedules || [];
  };

  return {
    init,
    chooseAvailabilityOption,
    getAll,
  };
};

export interface EventScheduleRepository {
  init(initializedEventSchedules: EventSchedule[]): void;
  chooseAvailabilityOption(
    id: number,
    availabilityOption: AvailabilityEnum
  ): void;
  getAll(): EventSchedule[];
}

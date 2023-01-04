import { EventScheduleRepository } from "./repository";
import { EventSchedulesPresenter } from "./presenter";
import { AvailabilityEnum } from "./entities";

export const createEventScheduleInteractor = (
  repository: EventScheduleRepository,
  presenter: EventSchedulesPresenter
) => {
  const chooseAvailabilityOption = (
    id: number,
    availabilityOption: AvailabilityEnum
  ) => {
    repository.chooseAvailabilityOption(id, availabilityOption);
    presenter.set(repository.getAll());
  };

  return {
    chooseAvailabilityOption,
  };
};

export type EventScheduleInteractor = ReturnType<
  typeof createEventScheduleInteractor
>;

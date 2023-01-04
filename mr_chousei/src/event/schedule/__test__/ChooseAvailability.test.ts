import { EventSchedule, AvailabilityEnum } from "../core/entities";
import { createEventScheduleRepository } from "../core/repository";
import {
  createEventSchedulesPresenter,
  EventSchedulesPresenter,
} from "../core/presenter";
import { createEventScheduleInteractor } from "../core/interactor";
import { createStore } from "../../../store";
import { createUserRepository } from "../../../user/core/repository";
import { createUserPresenter } from "../../../user/core/presenter";
import { chooseAvailabilityOption } from "../store/actions";
import { selectEventScheduleAvailabilityState } from "../store/selectors";

describe("Choose Availability", () => {
  it("User can choose availability", async () => {
    const steps = createSteps();

    const initializedEventSchedules = [
      {
        id: 1,
        times: new Date("2023-01-02"),
        availabilityState: null,
      },
      {
        id: 2,
        times: new Date("2023-01-03"),
        availabilityState: null,
      },
      {
        id: 3,
        times: new Date("2023-01-04"),
        availabilityState: null,
      },
    ];
    steps.givenEventScheduleOption(initializedEventSchedules);
    await steps.whenUserChooseAvailabilityOption(1, "available");
    steps.thenUserAvailabilityStateIs(1, "available");
  });
});

const createFakeStore = () => {
  const userRepository = createUserRepository();
  const userPresenter = createUserPresenter();
  const eventScheduleRepository = createEventScheduleRepository();
  const eventSchedulePresenter = createEventSchedulesPresenter();

  return {
    store: createStore(
      userRepository,
      userPresenter,
      eventScheduleRepository,
      eventSchedulePresenter
    ),
    eventScheduleRepository,
  };
};

const createSteps = () => {
  const { store, eventScheduleRepository: repository } = createFakeStore();

  const givenEventScheduleOption = (
    initializedEventSchedules: EventSchedule[]
  ) => {
    repository.init(initializedEventSchedules);
  };

  const whenUserChooseAvailabilityOption = async (
    id: number,
    availabilityStateOption: AvailabilityEnum
  ) => {
    await store.dispatch(
      chooseAvailabilityOption({
        id,
        availabilityOption: availabilityStateOption,
      })
    );
  };

  const thenUserAvailabilityStateIs = (
    id: number,
    expectedAvailabilityState: AvailabilityEnum
  ) => {
    const eventScheduleAvailabilityState = selectEventScheduleAvailabilityState(
      store.getState(),
      id
    );
    expect(eventScheduleAvailabilityState).toBe(expectedAvailabilityState);
  };

  return {
    givenEventScheduleOption,
    whenUserChooseAvailabilityOption,
    thenUserAvailabilityStateIs,
  };
};

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
import { render, screen, within } from "@testing-library/react";
import { FC } from "react";
import userEvent from "@testing-library/user-event";
import { App } from "../../../App";

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

const createSteps = () => {
  const givenEventScheduleOption = (
    initializedEventSchedules: EventSchedule[]
  ) => {
    const eventScheduleRepository = createEventScheduleRepository();
    const userRepository = createUserRepository()
    const eventSchedulePresenter = createEventSchedulesPresenter()
    const userPresenter = createUserPresenter()

    eventScheduleRepository.init(initializedEventSchedules);

    render(<App userRepository={userRepository} eventScheduleRepository={eventScheduleRepository}/>)
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

    const eventSchedulesList = screen.getByRole('list')
    const eventSchedulesItem = within(eventSchedulesList).getByRole("heading", {name: 'Mon Jan 02 2023'}).parentElement!
    const radioOk = within(eventSchedulesItem).getByRole("radio", {name: 'OK'})

    // userEvent.click(radioOk)
  };

  const thenUserAvailabilityStateIs = (
    id: number,
    expectedAvailabilityState: AvailabilityEnum
  ) => {
    const eventScheduleAvailabilityState = selectEventScheduleAvailabilityState(
      id
    )(store.getState());

    const eventSchedulesList = screen.getByRole('list')
    const eventSchedulesItem = within(eventSchedulesList).getByRole("heading", {name: 'Mon Jan 02 2023'}).parentElement!
    const radioOk = within(eventSchedulesItem).getByRole("radio", {name: 'OK'})

    expect(eventScheduleAvailabilityState).toBe(expectedAvailabilityState);
    expect(radioOk).toBeChecked()
  };

  return {
    givenEventScheduleOption,
    whenUserChooseAvailabilityOption,
    thenUserAvailabilityStateIs,
  };
};

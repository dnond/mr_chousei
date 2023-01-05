import { EventSchedule, AvailabilityEnum } from "../core/entities";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../../../App";
import { createRepositories } from "../../../__test__/createRepositories";

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
    await steps.whenUserChooseAvailabilityOption("Mon Jan 02 2023", "available");
    steps.thenUserAvailabilityStateIs("Mon Jan 02 2023", "available");
  });
});

const createSteps = () => {
  const givenEventScheduleOption = (
    initializedEventSchedules: EventSchedule[]
  ) => {
    const { eventScheduleRepository, userRepository } = createRepositories()

    eventScheduleRepository.init(initializedEventSchedules);

    render(<App userRepository={userRepository} eventScheduleRepository={eventScheduleRepository}/>)
  };

  const whenUserChooseAvailabilityOption = async (
    dateString: string,
    availabilityStateOption: AvailabilityEnum
  ) => {
    const radioOk = getRadioInput(dateString, availabilityStateOption)

    await userEvent.click(radioOk)
  };

  const thenUserAvailabilityStateIs = (
    dateString: string,
    availabilityStateOption: AvailabilityEnum
  ) => {
    const radioOk = getRadioInput(dateString, availabilityStateOption)

    expect(radioOk).toBeChecked()
  };

  const getRadioInput = (
    dateString: string,
    availabilityStateOption: AvailabilityEnum
  ) => {
    const eventSchedulesList = screen.getByRole('list')
    const eventSchedulesItem = within(eventSchedulesList).getByRole("heading", {name: dateString}).parentElement!
    const radioOk = within(eventSchedulesItem).getByRole("radio", {name: availabilityStateOption})

    return radioOk
  }

  return {
    givenEventScheduleOption,
    whenUserChooseAvailabilityOption,
    thenUserAvailabilityStateIs,
  };
};

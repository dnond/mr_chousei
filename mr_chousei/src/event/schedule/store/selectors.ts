import { RootState } from "../../../store";

export const selectEventScheduleAvailabilityState = (
  state: RootState,
  id: number
) => {
  return state.event.schedules.find((schedule) => {
    return schedule.id === id;
  })?.availabilityState;
};

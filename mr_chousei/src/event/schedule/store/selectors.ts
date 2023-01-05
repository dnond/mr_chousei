import { RootState } from "../../../store";


export const selectEventScheduleAvailabilityState = (id: number) => (state: RootState) => {
  return state.event.schedules.find((schedule) => {
    return schedule.id === id;
  })?.availabilityState;
}

export const selectEventSchedules = (state: RootState) => {
  return state.event.schedules
}

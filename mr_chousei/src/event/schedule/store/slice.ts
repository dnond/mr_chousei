import { createSlice } from "@reduxjs/toolkit";
import { EventSchedule } from "../core/entities";
import { chooseAvailabilityOption } from "./actions";

export const createEventSlice = (initialSchedules: EventSchedule[]) => {
  return createSlice({
    name: "event",
    initialState: {
      schedules: initialSchedules,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(
        chooseAvailabilityOption.fulfilled,
        (state, { payload }) => {
          state.schedules = payload;
        }
      );
    },
  });
};

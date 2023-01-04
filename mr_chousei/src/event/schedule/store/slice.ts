import { createSlice } from "@reduxjs/toolkit";
import { EventSchedule } from "../core/entities";
import { chooseAvailabilityOption } from "./actions";

export const createEventSlice = () => {
  return createSlice({
    name: "event",
    initialState: {
      schedules: new Array<EventSchedule>(),
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

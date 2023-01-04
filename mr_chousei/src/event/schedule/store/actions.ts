import { createAsyncThunk } from "@reduxjs/toolkit";
import { EventSchedule, AvailabilityEnum } from "../core/entities";
import { EventScheduleInteractor } from "../core/interactor";
import { EventSchedulesPresenter } from "../core/presenter";

export const chooseAvailabilityOption = createAsyncThunk<
  EventSchedule[],
  {
    id: number;
    availabilityOption: AvailabilityEnum;
  },
  {
    extra: {
      event: {
        schedules: {
          interactor: EventScheduleInteractor;
          presenter: EventSchedulesPresenter;
        };
      };
    };
  }
>("event/schedule/choose", (payload, { extra }) => {
  extra.event.schedules.interactor.chooseAvailabilityOption(
    payload.id,
    payload.availabilityOption
  );

  return extra.event.schedules.presenter.get();
});

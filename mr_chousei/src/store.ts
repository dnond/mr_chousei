import { UserRepository } from "./user/core/repository";
import { createUserInteractor } from "./user/core/interactor";
import { UserPresenter } from "./user/core/presenter";
import {
  combineReducers,
  configureStore,
  ThunkDispatch,
  EmptyObject,
  AnyAction,
} from "@reduxjs/toolkit";
import { createUserSlice } from "./user/store/slice";
import { UserInteractor } from "./user/core/interactor";
import { EventSchedule } from "./event/schedule/core/entities";
import {
  createEventScheduleInteractor,
  EventScheduleInteractor,
} from "./event/schedule/core/interactor";
import { EventSchedulesPresenter } from "./event/schedule/core/presenter";
import { EventScheduleRepository } from "./event/schedule/core/repository";
import { createEventSlice } from "./event/schedule/store/slice";

export const createStore = (
  repository: UserRepository,
  presenter: UserPresenter,
  eventScheduleRepository: EventScheduleRepository,
  eventSchedulesPresenter: EventSchedulesPresenter
) => {
  const interactor = createUserInteractor(repository, presenter);
  const userSlice = createUserSlice();
  const eventScheduleInteractor = createEventScheduleInteractor(
    eventScheduleRepository,
    eventSchedulesPresenter
  );

  const eventSlice = createEventSlice();

  const rootReducer = combineReducers({
    [userSlice.name]: userSlice.reducer,
    [eventSlice.name]: eventSlice.reducer,
  });

  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            user: { interactor, presenter },
            event: {
              schedules: {
                interactor: eventScheduleInteractor,
                presenter: eventSchedulesPresenter,
              },
            },
          },
        },
      }),
  });
};

export type RootState = {
  user: {
    nickname: string;
  };
  event: {
    schedules: EventSchedule[];
  };
};

export type Dispatch = ThunkDispatch<
  RootState,
  {
    user: {
      interactor: UserInteractor;
      presenter: UserPresenter;
    };
    event: {
      schedules: {
        interactor: EventScheduleInteractor;
        presenter: EventSchedulesPresenter;
      };
    };
  },
  AnyAction
>;

import { UserRepository } from "./user/core/repository"
import { createUserInteractor } from "./user/core/interactor"
import { UserPresenter } from "./user/core/presenter"
import { combineReducers, configureStore, ThunkDispatch, EmptyObject, AnyAction } from "@reduxjs/toolkit"
import { createUserSlice } from "./user/store/slice"
import { UserInteractor } from "./user/core/interactor"

export const createStore = (repository: UserRepository, presenter: UserPresenter) => {
  const interactor = createUserInteractor(repository, presenter)
  const userSlice = createUserSlice()
  const rootReducer = combineReducers({
    [userSlice.name]: userSlice.reducer,
  })

  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => (getDefaultMiddleware({ thunk: { extraArgument: { user: { interactor, presenter } } } }))
  })
}

export type RootState = {
  user: {
    nickname: string;
  }
}

export type Dispatch = ThunkDispatch<RootState, {
  user: {
    interactor: UserInteractor
    presenter: UserPresenter
  }
}, AnyAction>
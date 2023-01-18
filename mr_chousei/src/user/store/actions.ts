import { createAsyncThunk } from "@reduxjs/toolkit"
import { UserInteractor } from "../core/interactor"
import { UserPresenter } from "../core/presenter"

export const login = createAsyncThunk<
  string,
  string,
  { extra: { user: { interactor: UserInteractor, presenter: UserPresenter } } }
>("user/login", (nickname, { extra }) => {
  extra.user.interactor.login(nickname)

  return extra.user.presenter.getNickname()
})

export const logout = createAsyncThunk<
  string,
  void,
  { extra: { user: { interactor: UserInteractor, presenter: UserPresenter } } }
>("user/login", (_, { extra }) => {
  extra.user.interactor.logout()

  return extra.user.presenter.getNickname()
})

import { RootState } from "../../store"

export const selectNickname = (state: RootState) => {
  return state.user.nickname
}
import { createSlice } from "@reduxjs/toolkit"
import { UserRepository } from "../core/repository"
import { login } from "./actions"

export const createUserSlice = (userRepository: UserRepository) => {
  return createSlice({
    name: 'user',
    initialState: {
      nickname: userRepository.getCurrentUserNickname() || ''
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(login.fulfilled, (_, { payload }) => {
        return { nickname: payload }
      })
    }
  })

}
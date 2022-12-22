import { createSlice } from "@reduxjs/toolkit"
import { login } from "./actions"

export const createUserSlice = () => {
  return createSlice({
    name: 'user',
    initialState: {
      nickname: ''
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(login.fulfilled, (_, { payload }) => {
        return { nickname: payload }
      })
    }
  })

}
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type UserStateType = {
  username: string
  nickname: string
}

const INIT_STATE: UserStateType = { username: "", nickname: "" }

export const userSlice = createSlice({
  name: "user",
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (
      state: UserStateType,
      { payload }: PayloadAction<UserStateType>
    ) => {
      return payload // 设置 username nickname 到 redux store
    },
    logoutReducer: () => INIT_STATE
  }
})

export const { loginReducer, logoutReducer } = userSlice.actions
export default userSlice.reducer

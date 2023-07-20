import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type PageInfoType = {
  title: string
  desc?: string
  js?: string
  css?: string
}

const INIT_STATE: PageInfoType = {
  title: "",
  desc: "",
  js: "",
  css: ""
}

const pageInfoSlice = createSlice({
  name: "pageInfo",
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo: (state: PageInfoType, { payload }: PayloadAction<PageInfoType>) =>
      payload
  }
})

export const { resetPageInfo } = pageInfoSlice.actions

export default pageInfoSlice.reducer

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import produce from "immer"

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
      payload,

    // 修改标题
    changePageTitle: produce(
      (draft: PageInfoType, { payload }: PayloadAction<string>) => {
        draft.title = payload
      }
    )
  }
})

export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions
export default pageInfoSlice.reducer

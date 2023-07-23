import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import produce from "immer"

export type PageInfoType = {
  js?: string
  css?: string
  desc?: string
  title: string
  isPublished?: boolean
}

const INIT_STATE: PageInfoType = {
  js: "",
  css: "",
  desc: "",
  title: ""
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

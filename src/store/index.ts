import { configureStore } from "@reduxjs/toolkit"
import user, { UserStateType } from "./modules/user"
import pageInfo, { PageInfoType } from "@/store/modules/pageInfo"
import undoable, { excludeAction, StateWithHistory } from "redux-undo"
import components, { ComponentsStateType } from "./modules/components"

export type StateType = {
  user: UserStateType
  pageInfo: PageInfoType
  // components: ComponentsStateType
  components: StateWithHistory<ComponentsStateType> // 增加了 undo
}

export default configureStore({
  reducer: {
    user,
    // 页面信息
    pageInfo,
    // // 没有 undo
    // components,

    // 增加了 undo
    components: undoable(components, {
      limit: 20, // 限制 undo 20 步
      filter: excludeAction([
        "components/resetComponents",
        "components/changeSelectedId",
        "components/selectPrevComponent",
        "components/selectNextComponent"
      ])
    })
  }
})

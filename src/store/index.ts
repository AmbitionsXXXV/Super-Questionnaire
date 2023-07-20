import { configureStore } from "@reduxjs/toolkit"
import user, { UserStateType } from "./modules/user"
import components, { ComponentsStateType } from "./modules/components"
import pageInfo, { PageInfoType } from "@/store/modules/pageInfo"

export type StateType = {
  user: UserStateType
  pageInfo: PageInfoType
  components: ComponentsStateType
  // components: StateWithHistory<ComponentsStateType>; // 增加了 undo
}

export default configureStore({
  reducer: {
    user,
    // 页面信息
    pageInfo,
    components
  }
})

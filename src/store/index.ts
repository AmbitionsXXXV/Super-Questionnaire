import { configureStore } from "@reduxjs/toolkit";
import user, { UserStateType } from "./modules/user";

export type StateType = {
  user: UserStateType;
  // components: ComponentsStateType
  // components: StateWithHistory<ComponentsStateType>; // 增加了 undo
  // pageInfo: PageInfoType;
};

export default configureStore({
  reducer: {
    user
  }
});

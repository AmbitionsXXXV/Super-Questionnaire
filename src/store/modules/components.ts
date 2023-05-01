import { ComponentPropsType } from "@/components/QuestionComponents";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ComponentsInfoType = {
  fe_id: string; // Todo
  type: string;
  title: string;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  componentList: Array<ComponentsInfoType>;
};

const INIT_STATE: ComponentsStateType = {
  componentList: []
};

export const componentsSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>
    ) => action.payload
  }
});

export const { resetComponents } = componentsSlice.actions;
export default componentsSlice.reducer;

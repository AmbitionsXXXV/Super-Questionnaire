import produce from "immer";
import { ComponentPropsType } from "@/components/QuestionComponents";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getNextSelectedId } from "@/store/utils";

export type ComponentsInfoType = {
  fe_id: string; // Todo
  type: string;
  title: string;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  selectedId: string;
  componentList: Array<ComponentsInfoType>;
};

const INIT_STATE: ComponentsStateType = {
  selectedId: "",
  componentList: []
};

export const componentsSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (
      _: ComponentsStateType,
      { payload }: PayloadAction<ComponentsStateType>
    ) => payload,

    changeSelectedId: produce(
      (draft: ComponentsStateType, { payload }: PayloadAction<string>) => {
        draft.selectedId = payload;
      }
    ),

    // 添加新组件
    addComponent: produce(
      (
        draft: ComponentsStateType,
        { payload }: PayloadAction<ComponentsInfoType>
      ) => {
        const newComponent = payload;
        const { selectedId, componentList } = draft;
        const index = componentList.findIndex(c => c.fe_id === selectedId);

        if (index < 0) {
          // 未选中任何组件
          draft.componentList.push(newComponent);
        } else {
          // 选中了组件，插入到 index 后面
          draft.componentList.splice(index + 1, 0, newComponent);
        }

        draft.selectedId = newComponent.fe_id;
      }
    ),

    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        { payload }: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { fe_id, newProps } = payload;

        // 当前要修改属性的这个组件
        const curComp = draft.componentList.find(c => c.fe_id === fe_id);
        if (curComp) {
          curComp.props = { ...curComp.props, ...newProps };
        }
      }
    ),

    // 删除选中的组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { componentList = [], selectedId: removeId } = draft;

      // 重新计算 selectedId
      draft.selectedId = getNextSelectedId(removeId, componentList);

      const index = componentList.findIndex(c => c.fe_id === removeId);

      componentList.splice(index, 1);
    })
  }
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent
} = componentsSlice.actions;
export default componentsSlice.reducer;

import produce from "immer"
import cloneDeep from "lodash.clonedeep"
import { ComponentPropsType } from "@/components/QuestionComponents"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getNextSelectedId, insertNewComponent } from "@/store/utils"
import { nanoid } from "nanoid"

export type ComponentsInfoType = {
  fe_id: string // Todo
  type: string
  title: string
  isLocked?: boolean
  isHidden?: boolean
  props: ComponentPropsType
}

export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentsInfoType>
  copiedComponent: ComponentsInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  selectedId: "",
  componentList: [],
  copiedComponent: null
}

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
        draft.selectedId = payload
      }
    ),

    // 添加新组件
    addComponent: produce(
      (
        draft: ComponentsStateType,
        { payload }: PayloadAction<ComponentsInfoType>
      ) => {
        insertNewComponent(draft, payload)
      }
    ),

    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        { payload }: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { fe_id, newProps } = payload

        // 当前要修改属性的这个组件
        const curComp = draft.componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.props = { ...curComp.props, ...newProps }
        }
      }
    ),

    // 删除选中的组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { componentList = [], selectedId: removeId } = draft

      // 重新计算 selectedId
      draft.selectedId = getNextSelectedId(removeId, componentList)

      const index = componentList.findIndex(c => c.fe_id === removeId)

      componentList.splice(index, 1)
    }),

    // 隐藏/显示组件
    changeComponentHidden: produce(
      (
        draft: ComponentsStateType,
        { payload }: PayloadAction<{ fe_id: string; isHidden: boolean }>
      ) => {
        const { componentList = [] } = draft
        const { fe_id, isHidden } = payload

        let newSelectedId: string
        if (isHidden) {
          // 隐藏
          newSelectedId = getNextSelectedId(fe_id, componentList)
        } else {
          // 显示
          newSelectedId = fe_id
        }
        draft.selectedId = newSelectedId

        const curComp = componentList.find(c => c.fe_id === fe_id)
        if (curComp) curComp.isHidden = isHidden
      }
    ),

    // 锁定/解锁组件
    toggleComponentLocked: produce(
      (
        draft: ComponentsStateType,
        { payload }: PayloadAction<{ fe_id: string }>
      ) => {
        const { fe_id } = payload

        const curComp = draft.componentList.find(c => c.fe_id === fe_id)
        if (curComp) curComp.isLocked = !curComp.isLocked
      }
    ),

    // 拷贝当前选中的组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList = [] } = draft
      const selectedComponent = componentList.find(c => c.fe_id === selectedId)
      if (selectedComponent == null) return
      draft.copiedComponent = cloneDeep(selectedComponent)
    }),

    // 粘贴组件
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft
      if (copiedComponent == null) return

      // 要修改 fe_id
      copiedComponent.fe_id = nanoid()

      // 插入 copiedComponent 组件
      insertNewComponent(draft, copiedComponent)
    }),

    // 选中上一个
    selectPrevComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

      // 未选中组件
      if (selectedIndex < 0) return
      // 已经选中了第一个,无法再向上选中
      if (selectedIndex <= 0) return

      draft.selectedId = componentList[selectedIndex - 1].fe_id
    }),

    // 选中下一个
    selectNextComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

      // 未选中组件
      if (selectedIndex < 0) return
      // 已经选中了最后一个,无法再向下选中
      if (selectedIndex + 1 === componentList.length) return

      draft.selectedId = componentList[selectedIndex + 1].fe_id
    })
  }
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent
} = componentsSlice.actions
export default componentsSlice.reducer

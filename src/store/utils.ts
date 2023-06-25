import { ComponentsInfoType, ComponentsStateType } from "@/store/modules/components"

export function getNextSelectedId(
  fe_id: string,
  componentList: ComponentsInfoType[]
) {
  const visibleComponentList = componentList.filter(c => !c.isHidden)
  const index = visibleComponentList.findIndex(c => c.fe_id === fe_id)
  if (index < 0) return ""

  //   重新计算 selectedId
  let newSelectedId: string
  const length = visibleComponentList.length
  if (length <= 1) {
    newSelectedId = ""
  } else {
    if (index + 1 === length) {
      // 删除最后一个,选中上一个
      newSelectedId = visibleComponentList[index - 1].fe_id
    } else {
      // 删除的不是最后一个,删除以后,选中下一个
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
  }

  return newSelectedId
}

export function insertNewComponent(
  draft: ComponentsStateType,
  newComponent: ComponentsInfoType
) {
  const { selectedId, componentList } = draft
  const index = componentList.findIndex(c => c.fe_id === selectedId)

  if (index < 0) {
    // 未选中任何组件
    draft.componentList.push(newComponent)
  } else {
    // 选中了组件，插入到 index 后面
    draft.componentList.splice(index + 1, 0, newComponent)
  }

  draft.selectedId = newComponent.fe_id
}

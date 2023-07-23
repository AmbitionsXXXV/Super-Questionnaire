import { useKeyPress } from "ahooks"
import { useDispatch } from "react-redux"
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent
} from "@/store/modules/components"
import { ActionCreators as UndoActionCreators } from "redux-undo"

// 判断 activeElem 是否合法
function isActiveElementValid() {
  const activeElem = document.activeElement

  // 没有增加 dnd-kit 之前
  // if (activeElem === document.body) return true // 光标没有 focus 到 input

  // 增加 dnd-kit 之后
  if (activeElem === document.body) return true

  return !!activeElem?.matches('div[role="button"]')
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch()

  // 快捷键删除组件
  useKeyPress(["backspace", "delete"], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })

  // 快捷键复制组件
  useKeyPress(["ctrl.c", "meta.c"], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })

  // 快捷键粘贴组件
  useKeyPress(["ctrl.v", "meta.v"], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })

  // 选中上一个组件
  useKeyPress("uparrow", () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })

  // 选中下一个组件
  useKeyPress("downarrow", () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })

  // 撤销
  useKeyPress(
    ["ctrl.z", "meta.z"],
    () => {
      if (!isActiveElementValid()) return
      dispatch(UndoActionCreators.undo())
    },
    {
      exactMatch: true // 严格匹配
    }
  )

  // 重做
  useKeyPress(["ctrl.shift.z", "meta.shift.z"], () => {
    if (!isActiveElementValid()) return
    dispatch(UndoActionCreators.redo())
  })
}

export default useBindCanvasKeyPress

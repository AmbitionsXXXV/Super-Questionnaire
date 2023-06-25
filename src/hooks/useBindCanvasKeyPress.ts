import { useKeyPress } from "ahooks"
import { useDispatch } from "react-redux"
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent
} from "@/store/modules/components"

function isActiveElementValid() {
  const activeElem = document.activeElement

  // 光标没有 focus 到 input
  if (activeElem === document.body) return true
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

  // TODO:撤销/重做
}

export default useBindCanvasKeyPress

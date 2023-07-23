import { Spin } from "antd"
import { useDispatch } from "react-redux"
import type { FC, MouseEvent } from "react"
import useGetComponentInfo from "@/hooks/useGetComponentInfo"
import useBindCanvasKeyPress from "@/hooks/useBindCanvasKeyPress"
import {
  changeSelectedId,
  ComponentsInfoType,
  moveComponent
} from "@/store/modules/components"
import { getComponentConfByType } from "@/components/QuestionComponents"
import SortableContainer from "@/components/SortableContainer"
import SortableItem from "@/components/SortableItem"

type PropsType = {
  loading: boolean
}

function genComponent(componentInfo: ComponentsInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)

  if (componentConf == null) return null
  const { Component } = componentConf

  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()

  function handleClick(e: MouseEvent, id: string) {
    // 阻止事件冒泡
    e.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  // 绑定快捷键
  useBindCanvasKeyPress()

  if (loading) {
    return (
      <div className="text-center mt-6 flex items-center justify-center h-full w-full">
        <Spin />
      </div>
    )
  }

  // SortableContainer 组件的 items 属性，需要每个item 都有id
  const componentListWithId = componentList.map(c => ({ ...c, id: c.fe_id }))

  // 拖拽排序结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className="bg-white min-h-full overflow-hidden">
        {componentList
          .filter(c => !c.isHidden)
          .map(c => {
            const { fe_id, isLocked } = c

            return (
              <SortableItem id={fe_id} key={fe_id}>
                <div
                  onClick={e => handleClick(e, fe_id)}
                  className={`${
                    fe_id === selectedId
                      ? "m-3 border-2 border-solid p-3 rounded border-blue-300 hover:border-blue-300"
                      : "m-3 border-2 border-solid border-white p-3 rounded hover:border-slate-300"
                  } ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="pointer-events-none">{genComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas

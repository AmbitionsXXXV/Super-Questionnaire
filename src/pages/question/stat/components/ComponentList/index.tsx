import type { FC } from "react"
import useGetComponentInfo from "@/hooks/useGetComponentInfo"
import { getComponentConfByType } from "@/components/QuestionComponents"
import { twMerge } from "tailwind-merge"

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

const ComponentList: FC<PropsType> = ({
  selectedComponentId,
  setSelectedComponentId,
  setSelectedComponentType
}) => {
  const { componentList } = useGetComponentInfo()

  return (
    <div className="h-full overflow-y-auto bg-white">
      {componentList
        .filter(c => !c.isHidden) // 过滤隐藏的组件
        .map(c => {
          const { fe_id, props, type } = c

          const componentConf = getComponentConfByType(type)
          if (componentConf == null) return null

          const { Component } = componentConf

          return (
            <div
              key={fe_id}
              className={twMerge(
                `${
                  fe_id === selectedComponentId ? "border-[#1890ff]" : null
                } m-3 border border-solid border-white py-3 px-1.5 rounded-[3px] hover:border-[#d9d9d9]`
              )}
              onClick={() => {
                setSelectedComponentId(fe_id)
                setSelectedComponentType(type)
              }}
            >
              <div className="pointer-events-none opacity-80">
                <Component {...props}></Component>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default ComponentList

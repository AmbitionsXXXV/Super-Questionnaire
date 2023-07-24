import type { FC } from "react"
import { useState } from "react"
import useLoadQuestionData from "@/hooks/useLoadQuestionData"
import { Button, Result, Spin } from "antd"
import useGetPageInfo from "@/hooks/useGetPageInfo"
import { useNavigate } from "react-router-dom"
import { useTitle } from "ahooks"
import StatHeader from "@/pages/question/stat/components/StatHeader"
import ComponentList from "@/pages/question/stat/components/ComponentList"
import PageStat from "@/pages/question/stat/components/PageStat"
import ChartStat from "@/pages/question/stat/components/ChartStat"

const Stat: FC = () => {
  const navigate = useNavigate()
  const { loading } = useLoadQuestionData()
  const { title, isPublished } = useGetPageInfo()

  // 状态提升 selectedId type
  const [selectedComponentId, setSelectedComponentId] = useState("")
  const [selectedComponentType, setSelectedComponentType] = useState("")

  // 修改标题
  useTitle(`问卷统计-${title}`)

  // loading 效果
  const LoadingELem = (
    <div className="w-full h-full flex items-center justify-center">
      <Spin />
    </div>
  )

  // Content Elem
  function genContentElem() {
    if (typeof isPublished === "boolean" && !isPublished) {
      return (
        <div className="flex-1">
          <Result
            status="warning"
            title="该页面尚未发布"
            extra={
              <Button type="primary" onClick={() => navigate(-1)}>
                返回
              </Button>
            }
          ></Result>
        </div>
      )
    }

    return (
      <>
        <div className="w-[320px] mr-6">
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className="flex-1 bg-white py-3 px-4">
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className="w-[400px] ml-6 bg-white overflow-hidden py-3 px-4">
          <ChartStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f2f5] relative">
      <StatHeader />
      <div className="flex-auto py-3 px-0 h-stat-head">
        {loading && LoadingELem}
        {!loading && <div className="my-0 mx-6 flex h-full">{genContentElem()}</div>}
      </div>
    </div>
  )
}
export default Stat

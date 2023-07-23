import type { FC } from "react"
import useLoadQuestionData from "@/hooks/useLoadQuestionData"
import { Button, Result, Spin } from "antd"
import useGetPageInfo from "@/hooks/useGetPageInfo"
import { useNavigate } from "react-router-dom"
import { useTitle } from "ahooks"
import StatHeader from "@/pages/question/stat/components/StatHeader"

const Stat: FC = () => {
  const navigate = useNavigate()
  const { loading } = useLoadQuestionData()
  const { title, isPublished } = useGetPageInfo()

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
        <div className="w-[350px] mr-6">
          {/*<ComponentList*/}
          {/*  selectedComponentId={selectedComponentId}*/}
          {/*  setSelectedComponentId={setSelectedComponentId}*/}
          {/*  setSelectedComponentType={setSelectedComponentType}*/}
          {/*/>*/}
          Left
        </div>
        <div className="flex-auto bg-white py-3 px-4">
          {/*<PageStat*/}
          {/*  selectedComponentId={selectedComponentId}*/}
          {/*  setSelectedComponentId={setSelectedComponentId}*/}
          {/*  setSelectedComponentType={setSelectedComponentType}*/}
          {/*/>*/}
          Main
        </div>
        <div className="w-[400px] ml-6 bg-white overflow-hidden py-3 px-4">
          {/*<ChartStat*/}
          {/*  selectedComponentId={selectedComponentId}*/}
          {/*  selectedComponentType={selectedComponentType}*/}
          {/*/>*/}
          Right
        </div>
      </>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f2f5]">
      <StatHeader />
      <div className="flex-auto py-3 px-0">
        {loading && LoadingELem}
        {!loading && <div className="my-0 mx-6 flex">{genContentElem()}</div>}
      </div>
    </div>
  )
}
export default Stat

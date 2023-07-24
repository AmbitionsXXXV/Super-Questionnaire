import { type FC, useEffect, useState } from "react"
import { Typography } from "antd"
import { useRequest } from "ahooks"
import { getComponentStatService } from "@/service/stat"
import { useParams } from "react-router-dom"
import { getComponentConfByType } from "@/components/QuestionComponents"

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}

const ChartStat: FC<PropsType> = ({
  selectedComponentId,
  selectedComponentType
}) => {
  const { id = "" } = useParams()
  const [stat, setStat] = useState<any[]>([])

  const { run } = useRequest(
    async (questionId, componentId) =>
      await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat)
      }
    }
  )

  // 生成统计图表
  function genStatElem() {
    if (!selectedComponentId) return <div>未选中组件</div>

    const { StatComponent } = getComponentConfByType(selectedComponentType) || {}
    if (StatComponent == null) return <div>该组件无统计图表</div>

    return <StatComponent stat={stat} />
  }

  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId)
  }, [id, selectedComponentId])

  return (
    <>
      <Title level={3}>图表统计</Title>
      <div>{genStatElem()}</div>
    </>
  )
}

export default ChartStat

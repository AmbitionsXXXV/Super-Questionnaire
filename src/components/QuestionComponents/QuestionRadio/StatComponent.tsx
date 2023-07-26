import { FC, useMemo } from "react" // import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, DonutChart, Title } from "@tremor/react"
import { QuestionRadioStatPropsType } from "./interface"

const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat = [] }) => {
  // count 求和
  const sum = useMemo(() => {
    let s = 0
    stat.forEach(i => (s += i.count))
    return s
  }, [stat])

  const valueFormatter = (number: number) =>
    `$ ${Intl.NumberFormat("us").format(number).toString()}`

  return (
    <Card>
      <Title>单选选项: {sum}</Title>
      <DonutChart
        data={stat}
        index="name"
        variant="pie"
        category="count"
        showLabel={true}
        valueFormatter={valueFormatter}
        colors={["fuchsia", "cyan", "teal"]}
      />
    </Card>
  )
}

export default StatComponent

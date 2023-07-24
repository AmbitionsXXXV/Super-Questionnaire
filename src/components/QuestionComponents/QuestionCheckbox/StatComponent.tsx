import { type FC } from "react"
import { BarChart, Card } from "@tremor/react"
import { QuestionCheckboxStatPropsType } from "./interface"

const StatComponent: FC<QuestionCheckboxStatPropsType> = ({ stat }) => {
  return (
    <Card>
      <BarChart data={stat} index="name" categories={["count"]} className="mr-4" />
    </Card>
  )
}

export default StatComponent

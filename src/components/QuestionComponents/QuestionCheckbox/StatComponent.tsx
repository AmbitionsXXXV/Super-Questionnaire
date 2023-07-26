import { type FC } from "react"
import { BarChart, Card } from "@tremor/react"
import { QuestionCheckboxStatPropsType } from "./interface"

const StatComponent: FC<QuestionCheckboxStatPropsType> = ({ stat }) => {
  return (
    <Card>
      <BarChart
        data={stat}
        index="name"
        className="mr-4"
        colors={["teal"]}
        categories={["count"]}
      />
    </Card>
  )
}

export default StatComponent

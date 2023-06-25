import { type FC } from "react"
import {
  QuestionCheckboxDefaultProps,
  QuestionCheckboxPropsType
} from "@/components/QuestionComponents/QuestionCheckbox/interface"
import { Checkbox, Space, Typography } from "antd"

const { Paragraph } = Typography
const Component: FC<QuestionCheckboxPropsType> = () => {
  const { title, isVertical, list = [] } = { ...QuestionCheckboxDefaultProps }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? "vertical" : "horizontal"}>
        {list.map(opt => {
          const { checked, value, text } = opt
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          )
        })}
      </Space>
    </div>
  )
}

export default Component

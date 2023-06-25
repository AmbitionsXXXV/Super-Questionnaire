import type { FC } from "react"
import {
  QuestionRadioDefaultProps,
  QuestionRadioPropsType
} from "@/components/QuestionComponents/QuestionRadio/interface"
import { Radio, Space, Typography } from "antd"

const { Paragraph } = Typography
const QuestionRadio: FC<QuestionRadioPropsType> = (
  props: QuestionRadioPropsType
) => {
  const {
    title,
    value,
    options = [],
    isVertical
  } = { ...QuestionRadioDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? "vertical" : "horizontal"}>
          {options.map(option => {
            const { value, text } = option
            return (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default QuestionRadio

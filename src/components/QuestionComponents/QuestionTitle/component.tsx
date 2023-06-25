import { FC } from "react"
import { QuestionTitleDefaultProps, QuestionTitlePropsType } from "./interface"
import { Typography } from "antd"

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType
) => {
  const {
    text = "",
    level = 1,
    isCenter = false
  } = { ...QuestionTitleDefaultProps, ...props }

  const getFontSize = (level: number) => {
    switch (level) {
      case 1:
        return "24px"
      case 2:
        return "20px"
      case 3:
        return "16px"
      default:
        return "16px"
    }
  }

  return (
    <Title
      level={level}
      className={`${isCenter ? "text-center" : "text-start"} m-0 mb-1 ${getFontSize(
        level
      )}`}
    >
      {text}
    </Title>
  )
}

export default QuestionTitle

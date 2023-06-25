import { FC } from "react"
import { QuestionInfoPropsType } from "@/components/QuestionComponents/QuestionInfo/interface"
import { Typography } from "antd"

const { Title, Paragraph } = Typography

const QuestionInfo: FC<QuestionInfoPropsType> = ({
  title = "问卷标题",
  desc = "问卷描述"
}) => {
  const newDesc = desc?.split("\n")

  return (
    <div className="text-center">
      <Title className="text-2xl">{title}</Title>
      <Paragraph>
        {newDesc.map((d, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {newDesc}
          </span>
        ))}
      </Paragraph>
    </div>
  )
}

export default QuestionInfo

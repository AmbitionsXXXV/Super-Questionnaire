export type QuestionInfoPropsType = {
  title?: string
  desc?: string
  disabled?: boolean

  onChange?: (newProps: QuestionInfoPropsType) => void
}

export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: "问卷标题",
  desc: "问卷描述"
}

export type QuestionTitlePropsType = {
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean
  disabled?: boolean
  onChange?: (newProps: QuestionTitlePropsType) => void
}

export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: "一级标题",
  level: 1,
  isCenter: false
}

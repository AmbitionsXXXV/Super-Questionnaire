import Component from "./component"
import { QuestionTextareaDefaultProps } from "./interface"
import PropComponent from "./PropComponent"

export * from "./interface"

export default {
  title: "多行文本",
  type: "questionTextarea",
  defaultProps: QuestionTextareaDefaultProps,
  Component, // 画布显示的组件
  PropComponent
}

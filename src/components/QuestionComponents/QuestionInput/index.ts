import Component from "./component"
import { QuestionInputDefaultProps } from "./interface"
import PropComponent from "./PropComponent"

export * from "./interface"

export default {
  title: "输入框",
  type: "questionInput",
  defaultProps: QuestionInputDefaultProps,
  Component, // 画布显示的组件
  PropComponent
}

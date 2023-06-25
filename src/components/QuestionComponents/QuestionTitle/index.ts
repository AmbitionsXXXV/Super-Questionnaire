import Component from "./component"
import { QuestionTitleDefaultProps } from "./interface"
import PropComponent from "./PropComponent"

export * from "./interface"

export default {
  title: "标题",
  type: "questionTitle",
  defaultProps: QuestionTitleDefaultProps,
  Component,
  PropComponent
}

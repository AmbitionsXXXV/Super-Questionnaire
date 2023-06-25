import Component from "./component"
import PropComponent from "./PropComponent"
import { QuestionRadioDefaultProps } from "./interface"

export * from "./interface"

export default {
  title: "单选",
  type: "questionRadio",
  defaultProps: QuestionRadioDefaultProps,
  Component,
  PropComponent
}

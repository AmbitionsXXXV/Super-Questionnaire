import Component from "./component";
import PropComponent from "./PropComponent";
import { QuestionCheckboxDefaultProps } from "./interface";

export * from "./interface";

export default {
  title: "多选",
  type: "questionCheckbox", // 要和后端统一好
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps
};

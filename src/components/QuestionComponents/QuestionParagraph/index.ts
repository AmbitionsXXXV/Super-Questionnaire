import Component from "./component";
import PropComponent from "./PropComponent";
import { QuestionInputDefaultProps } from "@/components/QuestionComponents/QuestionInput";

export * from "./interface";

export default {
  title: "段落",
  type: "questionParagraph",
  defaultProps: QuestionInputDefaultProps,
  Component,
  PropComponent
};

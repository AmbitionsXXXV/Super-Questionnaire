import type { FC } from "react";
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";

// 各个组件的 prop type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType;

// 组件的配置
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};

// 全部组件的配置
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf
];

// 组件分组
export const componentConfGroup = [
  {
    groupId: "textGroup",
    groupName: "文本显示",
    components: [QuestionTitleConf]
  },
  {
    groupId: "inputGroup",
    groupName: "用户输入",
    components: [QuestionInputConf]
  }
  // {
  //   groupId: "chooseGroup",
  //   groupName: "用户选择",
  //   components: [QuestionRadioConf, QuestionCheckboxConf]
  // }
];

export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type);
}

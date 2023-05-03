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

export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type);
}

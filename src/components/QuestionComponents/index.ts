import type { FC } from "react"
import QuestionInfoConf, { QuestionInfoPropsType } from "./QuestionInfo"
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput"
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle"
import QuestionTextareaConf, { QuestionTextareaPropsType } from "./QuestionTextarea"
import QuestionParagraphConf, {
  QuestionParagraphPropsType
} from "./QuestionParagraph"
import QuestionRadioConf, {
  QuestionRadioPropsType,
  QuestionRadioStatPropsType
} from "./QuestionRadio"
import QuestionCheckboxConf, {
  QuestionCheckboxPropsType,
  QuestionCheckboxStatPropsType
} from "./QuestionCheckbox" // 各个组件的 prop type

// 各个组件的 prop type
export type ComponentPropsType = QuestionInputPropsType &
  QuestionInfoPropsType &
  QuestionTitlePropsType &
  QuestionRadioPropsType &
  QuestionTextareaPropsType &
  QuestionParagraphPropsType &
  QuestionCheckboxPropsType

// 统一，各个组件的统计属性类型
type ComponentStatPropsType = QuestionRadioStatPropsType &
  QuestionCheckboxStatPropsType

// 组件的配置
export type ComponentConfType = {
  title: string
  type: string
  defaultProps: ComponentPropsType
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  StatComponent?: FC<ComponentStatPropsType>
}

// 全部组件的配置
const componentConfList: ComponentConfType[] = [
  QuestionInfoConf,
  QuestionInputConf,
  QuestionTitleConf,
  QuestionRadioConf,
  QuestionTextareaConf,
  QuestionCheckboxConf,
  QuestionParagraphConf
]

// 组件分组
export const componentConfGroup = [
  {
    groupId: "textGroup",
    groupName: "文本显示",
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf]
  },
  {
    groupId: "inputGroup",
    groupName: "用户输入",
    components: [QuestionInputConf, QuestionTextareaConf]
  },
  {
    groupId: "chooseGroup",
    groupName: "用户选择",
    components: [QuestionRadioConf, QuestionCheckboxConf]
  }
]

export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}

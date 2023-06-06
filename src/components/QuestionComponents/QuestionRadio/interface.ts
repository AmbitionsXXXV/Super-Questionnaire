export type OptionType = {
  value: string;
  text: string;
};

export type QuestionRadioPropsType = {
  title?: string;
  value?: string;
  disabled?: boolean;
  isVertical?: boolean;
  options?: OptionType[];

  onChange?: (newProps: QuestionRadioPropsType) => void;
};

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: "单选标题",
  isVertical: false,
  options: [
    { value: "item1", text: "选项1" },
    { value: "item2", text: "选项2" },
    { value: "item3", text: "选项3" }
  ],
  value: ""
};

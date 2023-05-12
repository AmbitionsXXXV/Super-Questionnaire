export type QuestionInputPropsType = {
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (newProps: QuestionInputPropsType) => void;
};

export const QuestionInputDefaultProps: QuestionInputPropsType = {
  title: "输入框标题",
  placeholder: "请输入......"
};

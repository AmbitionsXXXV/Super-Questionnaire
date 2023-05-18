export type QuestionTextareaPropsType = {
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (newProps: QuestionTextareaPropsType) => void;
};

export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
  title: "多行文本",
  placeholder: "请输入......"
};

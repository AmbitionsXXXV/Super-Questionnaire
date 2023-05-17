export type QuestionParagraphPropsType = {
  text?: string;
  disabled?: boolean;
  isCenter?: boolean;

  onChange?: (newProps: QuestionParagraphPropsType) => void;
};

export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: "一行段落",
  isCenter: false
};

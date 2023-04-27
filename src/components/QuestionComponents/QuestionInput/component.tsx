import type { FC } from "react";
import { QuestionInputDefaultProps, QuestionInputType } from "./interface";
import { Input, Typography } from "antd";

const { Paragraph } = Typography;

const QuestionInput: FC<QuestionInputType> = (props: QuestionInputType) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  );
};

export default QuestionInput;

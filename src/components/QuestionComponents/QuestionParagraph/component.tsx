import { FC } from "react";
import { QuestionParagraphPropsType } from "@/components/QuestionComponents/QuestionParagraph/interface";
import { Typography } from "antd";

const QuestionParagraph: FC<QuestionParagraphPropsType> = ({
  text = "",
  isCenter = false
}) => {
  // ⚠️危险方法
  // const newText = text.replaceAll("\n", "<br>");
  const newText = text.split("\n");

  return (
    <Typography className={`${isCenter ? "text-center" : "text-start"} mb-0`}>
      {/*⚠️危险方法*/}
      {/*<span dangerouslySetInnerHTML={{ __html: newText }}></span>*/}
      {newText.map((t, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {t}
        </span>
      ))}
    </Typography>
  );
};

export default QuestionParagraph;

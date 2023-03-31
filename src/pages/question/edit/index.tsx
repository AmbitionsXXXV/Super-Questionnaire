import useLoadQuestionData from "@/hooks/useLoadQuestionData";
import type { FC } from "react";

const Edit: FC = () => {
  const { loading, questionData } = useLoadQuestionData();

  return (
    <>
      <div>Edit-Page</div>
      {loading ? <div>loading...</div> : <div>{JSON.stringify(questionData)}</div>}
    </>
  );
};
export default Edit;

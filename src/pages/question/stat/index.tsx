import type { FC } from "react";
import useLoadQuestionData from "@/hooks/useLoadQuestionData";

const Stat: FC = () => {
  const { loading, questionData } = useLoadQuestionData();

  return (
    <>
      <div>Stat Page</div>
      {loading ? <div>loading...</div> : <div>{JSON.stringify(questionData)}</div>}
    </>
  );
};
export default Stat;

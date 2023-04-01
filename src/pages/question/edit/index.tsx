import useLoadQuestionData from "@/hooks/useLoadQuestionData";
import type { FC } from "react";

const Edit: FC = () => {
  const { loading, data } = useLoadQuestionData();

  return (
    <>
      <div>Edit-Page</div>
      {loading ? <div>loading...</div> : <div>{JSON.stringify(data)}</div>}
    </>
  );
};
export default Edit;

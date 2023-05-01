import type { FC } from "react";
import useLoadQuestionData from "@/hooks/useLoadQuestionData";

const Stat: FC = () => {
  const { loading } = useLoadQuestionData();

  return (
    <>
      <div>Stat Page</div>
    </>
  );
};
export default Stat;

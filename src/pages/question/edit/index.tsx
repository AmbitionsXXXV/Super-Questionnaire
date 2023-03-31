import { getQuestionService } from "@/service/question";
import { useEffect } from "react";
import type { FC } from "react";
import { useParams } from "react-router-dom";

const Edit: FC = () => {
  const { id = "" } = useParams();

  useEffect(() => {
    const fn = async () => {
      const data = await getQuestionService(id);

      console.log(data);
    };

    fn();
  }, []);

  return (
    <>
      <div>Edit-{id}</div>
    </>
  );
};
export default Edit;

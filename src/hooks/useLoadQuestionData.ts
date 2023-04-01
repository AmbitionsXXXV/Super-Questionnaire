import { getQuestionService } from "@/service/question";
import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";

function useLoadQuestionData() {
  const { id = "" } = useParams();

  async function load() {
    const data = await getQuestionService(id);

    return data;
  }

  const { data, loading, error } = useRequest(load);

  return {
    data,
    loading,
    error
  };
}

export default useLoadQuestionData;

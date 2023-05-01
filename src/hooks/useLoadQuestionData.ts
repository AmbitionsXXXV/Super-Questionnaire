import { getQuestionService } from "@/service/question";
import { resetComponents } from "@/store/modules/components";
import { useRequest } from "ahooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function useLoadQuestionData() {
  const { id = "" } = useParams();
  const dispatch = useDispatch();

  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error("没有该问卷");
      const data = await getQuestionService(id);
      return data;
    },
    { manual: true }
  );

  useEffect(() => {
    if (!data) return;

    const { title = "", components = [] } = data;

    // 存储到 redux 中
    dispatch(resetComponents(components));
  }, [data]);

  // 请求数据
  useEffect(() => {
    run(id);
  }, [id]);

  return {
    loading,
    error
  };
}

export default useLoadQuestionData;

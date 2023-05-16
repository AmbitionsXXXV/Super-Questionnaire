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
    const { title = "", componentList = [] } = data;

    // 获取默认的 selectedId
    let selectedId = "";
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id; // 默认选中第一个组件
    }

    // 存储到 redux 中
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }));
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

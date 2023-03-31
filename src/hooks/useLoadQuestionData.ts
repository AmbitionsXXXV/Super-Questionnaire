import { getQuestionService } from "@/service/question";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function useLoadQuestionData() {
  const { id = "" } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [questionData, setQuestionData] = useState({});

  useEffect(() => {
    const fn = async () => {
      const data = await getQuestionService(id);
      setQuestionData(data);
      setLoading(false);
    };

    fn();
  }, []);

  return { loading, questionData };
}

export default useLoadQuestionData;

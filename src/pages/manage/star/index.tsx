import type { FC } from "react";
import { useState } from "react";
import { useTitle } from "ahooks";
import { QuestionCard } from "@/components/QuestionCard/QuestionCard";
import { Empty, Typography } from "antd";
import { data } from "@/data/data";
import ListSearch from "@/components/ListSearch/ListSearch";

const { Title } = Typography;

const Star: FC = () => {
  useTitle("我的问卷 - 星标问卷");
  const [questionList, setQuestionList] = useState(data);

  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <Title level={2}>🌟星标问卷</Title>
        </div>
        <div className="flex-1 text-right">
          <ListSearch />
        </div>
      </div>
      <div className="mb-5">
        {questionList.length === 0 && <Empty description="暂无🌟星标问卷" />}
        {questionList.length > 0 &&
          questionList.map(q => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>

      <div className="text-center">分页</div>
    </>
  );
};

export default Star;

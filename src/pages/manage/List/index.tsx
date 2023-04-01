import type { FC } from "react";
import { useTitle } from "ahooks";
import { QuestionCard } from "@/components/QuestionCard/QuestionCard";
import { Empty, Spin, Typography } from "antd";
import ListSearch from "@/components/ListSearch/ListSearch";
import useLoadQuestionListData from "@/hooks/useLoadQuestionListData";

const { Title } = Typography;

const List: FC = () => {
  useTitle("超级问卷 - 我的问卷");
  const { data = {}, loading } = useLoadQuestionListData();
  const { list = [], total = 0 } = data;

  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <Title level={2}>我的问卷</Title>
        </div>
        <div className="flex-1 text-right">
          <ListSearch />
        </div>
      </div>

      <div className="mb-5">
        {loading && (
          <div className="text-center">
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无问卷" />}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>

      <div className="text-center">上划加载更多...</div>
    </>
  );
};
export default List;

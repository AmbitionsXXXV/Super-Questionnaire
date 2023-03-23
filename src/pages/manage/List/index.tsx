import type { FC } from "react";
import { useState } from "react";
import styles from "../index.module.scss";
import { useTitle } from "ahooks";
import { QuestionCard } from "@/components/QuestionCard/QuestionCard";
import { Empty, Typography } from "antd";
import ListSearch from "@/components/ListSearch/ListSearch";
import { data } from "@/data/data";

const { Title } = Typography;

const List: FC = () => {
  useTitle("超级问卷 - 我的问卷");
  const [questionList, setQuestionList] = useState(data);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={2}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无问卷" />}
        {questionList.length > 0 &&
          questionList.map(q => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>

      <div className={styles.footer}>上划加载更多...</div>
    </>
  );
};
export default List;

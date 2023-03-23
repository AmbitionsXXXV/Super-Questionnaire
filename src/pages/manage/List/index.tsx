import type { FC } from "react";
import { useState } from "react";
import styles from "../index.module.scss";
import { useTitle } from "ahooks";
import { QuestionCard } from "@/components/QuestionCard/QuestionCard";
import { Empty, Typography } from "antd";
import ListSearch from "@/components/ListSearch/ListSearch";

const { Title } = Typography;

const List: FC = () => {
  useTitle("超级问卷 - 我的问卷");
  const [questionList, setQuestionList] = useState([
    {
      _id: "q1",
      title: "问卷1",
      isPublished: false,
      isStar: true,
      answerCount: 4,
      createdAt: "3月20号 23:11"
    },
    {
      _id: "q2",
      title: "问卷2",
      isPublished: true,
      isStar: false,
      answerCount: 3,
      createdAt: "3月9号 24:11"
    },
    {
      _id: "q3",
      title: "问卷3",
      isPublished: false,
      isStar: true,
      answerCount: 4,
      createdAt: "3月20号 3:11"
    },
    {
      _id: "q4",
      title: "问卷4",
      isPublished: true,
      isStar: false,
      answerCount: 8,
      createdAt: "3月21号 2:11"
    }
  ]);

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

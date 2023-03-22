import type { FC } from "react";
import { useState } from "react";
import styles from "./index.module.scss";
import { useTitle } from "ahooks";
import { QuestionCard } from "@/components/QuestionCard/QuestionCard";

const List: FC = () => {
  useTitle("超级问卷-我的问卷");
  const [questionList, setQuestionList] = useState([
    {
      _id: "q1",
      title: "问卷1",
      isPublished: false,
      answerCount: 4,
      createAt: "3月20号 23:11"
    },
    {
      _id: "q2",
      title: "问卷2",
      isPublished: true,
      answerCount: 3,
      createAt: "3月9号 24:11"
    },
    {
      _id: "q3",
      title: "问卷3",
      isPublished: false,
      answerCount: 4,
      createAt: "3月20号 3:11"
    },
    {
      _id: "q4",
      title: "问卷4",
      isPublished: true,
      answerCount: 8,
      createAt: "3月21号 2:11"
    }
  ]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.map(q => {
          const { _id } = q;
          return <QuestionCard key={_id} {...q} />;
        })}
      </div>
      <div className={styles.footer}>List Footer</div>
    </>
  );
};
export default List;

import type { FC } from "react";
import styles from "./QuestionCard.module.scss";

type PropsType = {
  _id: string;
  title: string;
  isPublished: boolean;
  answerCount: number;
  createAt: string;
};

export const QuestionCard: FC<PropsType> = ({
  _id,
  title,
  createAt,
  answerCount,
  isPublished
}) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <a href="#">{title}</a>
          </div>
          <div className={styles.right}>
            {isPublished ? (
              <span style={{ color: "cyan" }}>已发布</span>
            ) : (
              <span>未发布</span>
            )}
            &nbsp;
            <span>答卷数量: {answerCount}</span>
            &nbsp;
            <span>{createAt}</span>
          </div>
        </div>
        <div className={styles["button-container"]}>
          <div className={styles.left}>
            <button>编辑问卷</button>
            <button>数据统计</button>
          </div>
          <div className={styles.right}>
            <button>标星</button>
            <button>复制</button>
            <button>删除</button>
          </div>
        </div>
      </div>
    </>
  );
};

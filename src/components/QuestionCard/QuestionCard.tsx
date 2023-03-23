import { useState } from "react";
import type { FC } from "react";
import styles from "./QuestionCard.module.scss";
import { Button, Divider, Modal, Popconfirm, Space, Tag, message } from "antd";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarFilled,
  StarOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

type PropsType = {
  _id: string;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
};

const { confirm } = Modal;

export const QuestionCard: FC<PropsType> = ({
  _id,
  title,
  createdAt,
  answerCount,
  isPublished,
  isStar
}) => {
  const navigator = useNavigate();
  const [isStarState, setIsStarState] = useState<boolean>(isStar);

  function Duplicate() {
    message.success("复制成功");
  }

  function Del() {
    confirm({
      title: "确定删除该问卷？",
      icon: <ExclamationCircleOutlined />,
      okText: "确认",
      cancelText: "取消",
      onOk: () => message.success("删除成功")
    });
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link
              to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
            >
              <Space>
                {isStar && <StarFilled style={{ color: "red" }} />}
                {title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? (
                <Tag color="processing">已发布</Tag>
              ) : (
                <Tag color="magenta">未发布</Tag>
              )}
              <span>答卷: {answerCount}</span>
              <span>{createdAt}</span>
            </Space>
          </div>
        </div>
        <Divider style={{ margin: "14px 0" }} />
        <div className={styles["button-container"]}>
          <div className={styles.left}>
            <Space>
              <Button
                type="text"
                size="small"
                icon={<EditOutlined />}
                onClick={() => navigator(`/question/edit/${_id}`)}
              >
                编辑问卷
              </Button>
              <Button
                type="text"
                size="small"
                icon={<LineChartOutlined />}
                onClick={() => navigator(`/question/stat/${_id}`)}
                disabled={!isPublished}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button
                type="text"
                icon={<StarOutlined />}
                size="small"
                // onClick={changeStar}
                // disabled={changeStarLoading}
              >
                {isStar ? "取消标星" : "标星"}
              </Button>
              <Popconfirm
                title="确定复制该问卷？"
                okText="确定"
                cancelText="取消"
                onConfirm={Duplicate}
              >
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  size="small"
                  // disabled={duplicateLoading}
                >
                  复制
                </Button>
              </Popconfirm>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                size="small"
                onClick={Del}
                // disabled={deleteLoading}
              >
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};

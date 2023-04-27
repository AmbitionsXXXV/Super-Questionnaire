import type { FC } from "react";
import { useState } from "react";
import { useRequest, useTitle } from "ahooks";
import {
  Button,
  Empty,
  Modal,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
  message
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ListSearch from "@/components/ListSearch/ListSearch";
import useLoadQuestionListData from "@/hooks/useLoadQuestionListData";
import ListPagination from "@/components/ListPagination/ListPagination";
import { deleteQuestionsService, updateQuestionService } from "@/service/question";
import { ColumnsType } from "antd/es/table";

const { Title } = Typography;
const { confirm } = Modal;

interface IObject {
  answerCount: number;
  createdAt: string;
  isDeleted: boolean;
  isPublished: boolean;
  isStar: boolean;
  title: string;
  _id: string;
}

const Trash: FC = () => {
  useTitle("超级问卷 - ♻️回收站");
  const {
    data = {},
    loading,
    refresh
  } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;
  // 记录 id
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const columns = [
    {
      title: "标题",
      dataIndex: "title"
      // key: 'title', // 循环列的 key ，它会默认取 dataIndex 的值
    },
    {
      title: "是否发布",
      align: "center",
      dataIndex: "isPublished",
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color="processing">已发布</Tag>
        ) : (
          <Tag color="magenta">未发布</Tag>
        );
      }
    },
    {
      title: "答卷",
      align: "center",
      dataIndex: "answerCount"
    },
    {
      title: "创建时间",
      align: "center",
      dataIndex: "createdAt"
    }
  ];

  // 恢复
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false });
      }
    },
    {
      manual: true,
      debounceWait: 500, // 防抖
      onSuccess() {
        message.success("恢复成功");
        refresh(); // 手动刷新列表
        setSelectedIds([]);
      }
    }
  );

  // 删除
  const { run: deleteQuestion } = useRequest(
    async () => await deleteQuestionsService(selectedIds),
    {
      manual: true,
      onSuccess() {
        message.success("删除成功");
        refresh();
        setSelectedIds([]);
      }
    }
  );

  function Del() {
    confirm({
      title: "确认彻底删除该问卷？",
      icon: <ExclamationCircleOutlined />,
      content: "删除操作无法撤销",
      okText: "确认",
      cancelText: "取消",
      onOk: deleteQuestion
    });
  }

  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <Title level={2}>♻️回收站</Title>
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
        {!loading && list.length === 0 && <Empty description="暂无♻️回收问卷" />}
        {!loading && list.length > 0 && (
          <>
            <div className="mb-4">
              <Space>
                <Button
                  type="primary"
                  disabled={selectedIds.length === 0}
                  onClick={recover}
                >
                  恢复
                </Button>
                <Button danger disabled={selectedIds.length === 0} onClick={Del}>
                  彻底删除
                </Button>
              </Space>
            </div>
            <Table
              dataSource={list}
              columns={columns as ColumnsType<any>}
              pagination={false}
              rowKey={(q: IObject) => q._id}
              rowSelection={{
                type: "checkbox",
                onChange: selectedRowKeys => {
                  setSelectedIds(selectedRowKeys as string[]);
                }
              }}
            />
          </>
        )}
      </div>

      <div className="text-center">
        {!loading && <ListPagination total={total} />}
      </div>
    </>
  );
};

export default Trash;

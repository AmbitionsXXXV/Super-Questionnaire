import type { FC } from "react";
import { useState } from "react";
import { useTitle } from "ahooks";
import { Button, Empty, Modal, Space, Table, Tag, Typography } from "antd";
import { IData, data } from "@/data/data";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ListSearch from "@/components/ListSearch/ListSearch";

const { Title } = Typography;
const { confirm } = Modal;

const Trash: FC = () => {
  useTitle("超级问卷 - ♻️回收站");
  const [questionList, setQuestionList] = useState<IData[]>(data);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const columns = [
    {
      title: "标题",
      dataIndex: "title"
      // key: 'title', // 循环列的 key ，它会默认取 dataIndex 的值
    },
    {
      title: "是否发布",
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
      dataIndex: "answerCount"
    },
    {
      title: "创建时间",
      dataIndex: "createdAt"
    }
  ];

  function Del() {
    confirm({
      title: "确认彻底删除该问卷？",
      icon: <ExclamationCircleOutlined />,
      content: "删除操作无法撤销",
      okText: "确认",
      cancelText: "取消"
      // onOk: deleteQuestion
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
        {questionList.length === 0 && <Empty description="暂无♻️回收问卷" />}
        {questionList.length > 0 && (
          <>
            <div style={{ marginBottom: "14px" }}>
              <Space>
                <Button type="primary" disabled={selectedIds.length === 0}>
                  恢复
                </Button>
                <Button danger disabled={selectedIds.length === 0} onClick={Del}>
                  删除
                </Button>
              </Space>
            </div>
            <Table
              dataSource={data}
              columns={columns}
              pagination={false}
              rowKey={q => q._id}
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

      <div className="text-center">分页</div>
    </>
  );
};

export default Trash;

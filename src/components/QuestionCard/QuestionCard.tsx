import { useState } from "react"
import type { FC } from "react"
import { Button, Divider, Modal, Popconfirm, Space, Tag, message } from "antd"
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarFilled,
  StarOutlined
} from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useRequest } from "ahooks"
import { duplicateQuestionService, updateQuestionService } from "@/service/question"

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

const { confirm } = Modal

export const QuestionCard: FC<PropsType> = ({
  _id,
  title,
  createdAt,
  answerCount,
  isPublished,
  isStar
}) => {
  const navigator = useNavigate()
  const [isStarState, setIsStarState] = useState<boolean>(isStar)

  // 修改 标星
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState) // 更新 state
        message.success("已更新")
      }
    }
  )

  // 复制问卷
  const { loading: duplicateLoading, run: Duplicate } = useRequest(
    async () => await duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess(result) {
        message.success("复制成功")
        navigator(`/question/edit/${result.id}`) // 跳转到问卷编辑页
      }
    }
  )

  // 删除问卷
  const [isDeletedState, setIsDeletedState] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success("删除成功")
        setIsDeletedState(true)
      }
    }
  )

  function Del() {
    confirm({
      title: "确定删除该问卷？",
      icon: <ExclamationCircleOutlined />,
      okText: "确认",
      cancelText: "取消",
      onOk: deleteQuestion
    })
  }

  // 已经删除的问卷，不要再渲染卡片了
  if (isDeletedState) return null

  return (
    <>
      <div className="container bg-white my-5 py-3 rounded-lg hover:shadow-md">
        <div className="flex">
          <div className="flex-1">
            <Link
              to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
            >
              <Space className="ml-3">
                {isStarState && <StarFilled style={{ color: "red" }} />}
                {title}
              </Space>
            </Link>
          </div>
          <div className="right flex-1 text-right text-sm">
            <Space className="mr-3">
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
        <div className="flex">
          <div className="flex-1">
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
          <div className="flex-1 text-right">
            <Space>
              <Button
                type="text"
                icon={<StarOutlined />}
                size="small"
                onClick={changeStar}
                disabled={changeStarLoading}
              >
                {isStarState ? "取消标星" : "标星"}
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
                  disabled={duplicateLoading}
                >
                  复制
                </Button>
              </Popconfirm>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                size="small"
                onClick={Del}
                className="text-[#999]"
                disabled={deleteLoading}
              >
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  )
}

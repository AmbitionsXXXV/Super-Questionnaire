import type { FC } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Button, Divider, Space, message } from "antd"
import {
  DeleteOutlined,
  PlusOutlined,
  BarsOutlined,
  StarOutlined
} from "@ant-design/icons"
import { createQuestionService } from "@/service/question"
import { useRequest } from "ahooks"

const ManageLayout: FC = () => {
  const navigator = useNavigate()
  const { pathname } = useLocation()

  const {
    run: handleCreateClick,
    // error,
    loading
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(res) {
      navigator(`/question/edit/${res.id}`)
      message.success("问卷创建成功")
    }
  })

  return (
    <div className="container max-w-screen-xl mx-auto py-6 flex">
      <div className="w-[120px]">
        <Space direction="vertical" className="sticky top-3">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleCreateClick}
            disabled={loading}
          >
            创建问卷
          </Button>
          <Divider style={{ borderTop: "transparent", marginBottom: "16px" }} />
          <Button
            type={pathname.startsWith("/manage/list") ? "default" : "text"}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => navigator("/manage/list")}
          >
            我的问卷
          </Button>
          <Divider style={{ borderTop: "transparent", margin: "0" }} />
          <Button
            type={pathname.startsWith("/manage/star") ? "default" : "text"}
            size="large"
            icon={<StarOutlined />}
            onClick={() => navigator("/manage/star")}
          >
            星标问卷
          </Button>
          <Divider style={{ borderTop: "transparent", margin: "0" }} />
          <Button
            type={pathname.startsWith("/manage/trash") ? "default" : "text"}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => navigator("/manage/trash")}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className="flex-1 ml-[60px]">
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout

import type { FC } from "react"
import { Button, Space, Typography } from "antd"
import { LeftOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import EditToolbar from "../EditToolbar"

const { Title } = Typography

const EditHeader: FC = () => {
  const navigator = useNavigate()

  return (
    <div className="bg-white border-b border-b-slate-200 px-0 py-3">
      <div className="flex my-0 mx-6">
        <div className="flex-1">
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={() => navigator(-1)}
            >
              返回
            </Button>
            <Title className="text-lg leading-none my-0">问卷标题</Title>
          </Space>
        </div>
        <div className="flex-1 text-center">
          <EditToolbar />
        </div>
        <div className="flex-1 text-right">
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader

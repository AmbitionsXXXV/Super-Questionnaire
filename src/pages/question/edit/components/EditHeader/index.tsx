import type { ChangeEvent, FC } from "react"
import { useState } from "react"
import { Button, Input, Space, Typography } from "antd"
import { EditOutlined, LeftOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import EditToolbar from "../EditToolbar"
import useGetPageInfo from "@/hooks/useGetPageInfo"
import { useDispatch } from "react-redux"
import { changePageTitle } from "@/store/modules/pageInfo"

const { Title } = Typography

// 显示和修改标题
const TitleElem: FC = () => {
  const { title } = useGetPageInfo()
  const dispatch = useDispatch()
  const [editSate, setEditState] = useState<boolean>(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    dispatch(changePageTitle(newTitle))
  }

  if (editSate) {
    return (
      <Input
        value={title}
        onChange={handleChange}
        onBlur={() => setEditState(false)}
        onPressEnter={() => setEditState(false)}
      />
    )
  }

  return (
    <Space>
      <Title className="text-lg leading-none my-0">{title}</Title>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => setEditState(true)}
      />
    </Space>
  )
}

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
            <TitleElem />
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

import type { ChangeEvent, FC } from "react"
import { useState } from "react"
import { Button, Input, Space, Typography } from "antd"
import { EditOutlined, LeftOutlined, LoadingOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "react-router-dom"
import EditToolbar from "../EditToolbar"
import useGetPageInfo from "@/hooks/useGetPageInfo"
import { useDispatch } from "react-redux"
import { changePageTitle } from "@/store/modules/pageInfo"
import useGetComponentInfo from "@/hooks/useGetComponentInfo"
import { useDebounceEffect, useKeyPress, useRequest } from "ahooks"
import { updateQuestionService } from "@/service/question"

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

// 保存按钮
const SaveButton: FC = () => {
  const { id } = useParams()
  // 需要保存 pageInfo  componentList
  const pageInfo = useGetPageInfo()
  const { componentList = [] } = useGetComponentInfo()

  // 快捷键保存
  useKeyPress(["ctrl.s", "meta.s"], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) save()
  })

  const { run: save, loading } = useRequest(
    async () =>
      id && (await updateQuestionService(id, { ...pageInfo, componentList })),
    {
      manual: true
    }
  )

  // 自定保存
  useDebounceEffect(
    () => {
      save()
    },
    [componentList, pageInfo],
    { wait: 1000 }
  )

  return (
    <Button
      onClick={save}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      保存
    </Button>
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
            <SaveButton />
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader

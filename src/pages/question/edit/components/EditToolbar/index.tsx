import type { FC } from "react"
import { Button, Space, Tooltip } from "antd"
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined
} from "@ant-design/icons"
import { useDispatch } from "react-redux"
import {
  changeComponentHidden,
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  toggleComponentLocked
} from "@/store/modules/components"
import UseGetComponentInfo from "@/hooks/useGetComponentInfo"

const EditToolbox: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent, copiedComponent } = UseGetComponentInfo()

  const { isLocked } = selectedComponent || {}

  function handleDelete() {
    dispatch(removeSelectedComponent())
  }

  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }

  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }))
  }

  function handleCopy() {
    // 复制
    dispatch(copySelectedComponent())
  }

  function handlePaste() {
    // 粘贴: 是否复制后
    dispatch(pasteCopiedComponent())
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          onClick={handleHidden}
        />
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          type={isLocked ? "primary" : "default"}
          icon={<LockOutlined />}
          onClick={handleLock}
        />
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy} />
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          disabled={copiedComponent == null}
          onClick={handlePaste}
        />
      </Tooltip>
    </Space>
  )
}

export default EditToolbox

import type { FC } from "react"
import { Button, Space, Tooltip } from "antd"
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UpOutlined
} from "@ant-design/icons"
import { useDispatch } from "react-redux"
import {
  changeComponentHidden,
  copySelectedComponent,
  moveComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  toggleComponentLocked
} from "@/store/modules/components"
import UseGetComponentInfo from "@/hooks/useGetComponentInfo"

const EditToolbox: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, componentList, selectedComponent, copiedComponent } =
    UseGetComponentInfo()
  const length = componentList.length
  const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
  const isFirst = selectedIndex <= 0
  const isLast = selectedIndex + 1 >= length

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

  // 上移
  function moveUp() {
    if (isFirst) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
  }

  // 下移
  function moveDown() {
    if (isLast) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
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
      <Tooltip title="上移">
        <Button
          shape="circle"
          onClick={moveUp}
          disabled={isFirst}
          icon={<UpOutlined />}
        />
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          disabled={isLast}
          onClick={moveDown}
          icon={<DownOutlined />}
        />
      </Tooltip>
    </Space>
  )
}

export default EditToolbox

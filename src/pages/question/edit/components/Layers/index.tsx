import useGetComponentInfo from "@/hooks/useGetComponentInfo"
import {
  changeComponentHidden,
  changeComponentTitle,
  changeSelectedId,
  toggleComponentLocked
} from "@/store/modules/components"
import { Button, Input, message, Space } from "antd"
import { ChangeEvent, type FC, useState } from "react"
import { useDispatch } from "react-redux"
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons"

const Layers: FC = () => {
  const dispatch = useDispatch()

  // 记录当前正在修改标题的组件
  const [changingTitleId, setChangingTitleId] = useState("")
  const { componentList, selectedId } = useGetComponentInfo()

  // 点击选中组件
  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find(c => c.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.info("不能选中隐藏的组件")
      return
    }
    if (fe_id !== selectedId) {
      // 当前组件未被选中，执行选中
      dispatch(changeSelectedId(fe_id))
      setChangingTitleId("")
      return
    }

    // 点击修改标题
    setChangingTitleId(fe_id)
  }

  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    if (!selectedId) return

    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
  }

  // 切换 隐藏/显示
  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }

  // 切换 锁定/解锁
  function changeLocked(fe_id: string) {
    dispatch(toggleComponentLocked({ fe_id }))
  }

  return (
    <>
      {componentList.map(({ fe_id, title, isHidden, isLocked }) => {
        return (
          <div key={fe_id} className="py-2 border-b border-gray-200 flex group">
            <div
              onClick={() => handleTitleClick(fe_id)}
              className={`flex-auto leading-loose ${
                fe_id === selectedId ? "text-blue-500" : ""
              }`}
            >
              {fe_id !== changingTitleId ? (
                title
              ) : (
                <Input
                  value={title}
                  onChange={changeTitle}
                  onBlur={() => setChangingTitleId("")}
                  onPressEnter={() => setChangingTitleId("")}
                />
              )}
            </div>
            <div className="w-14 text-end">
              <Space>
                <Button
                  size="small"
                  shape="circle"
                  icon={<EyeInvisibleOutlined />}
                  type={isHidden ? "primary" : "text"}
                  onClick={() => changeHidden(fe_id, !isHidden)}
                  className={`${
                    !isHidden ? "opacity-20 group-hover:opacity-100" : ""
                  }`}
                />
                <Button
                  size="small"
                  shape="circle"
                  icon={<LockOutlined />}
                  type={isLocked ? "primary" : "text"}
                  onClick={() => changeLocked(fe_id)}
                  className={`${
                    !isLocked ? "opacity-20 group-hover:opacity-100" : ""
                  }`}
                />
              </Space>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Layers

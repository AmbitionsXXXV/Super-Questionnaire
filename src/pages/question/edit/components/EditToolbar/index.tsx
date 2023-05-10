import type { FC } from "react";
import { Button, Space, Tooltip } from "antd";
import { DeleteOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  changeComponentHidden,
  removeSelectedComponent
} from "@/store/modules/components";
import UseGetComponentInfo from "@/hooks/useGetComponentInfo";

const EditToolbox: FC = () => {
  const dispatch = useDispatch();
  const { selectedId } = UseGetComponentInfo();

  function handleDelete() {
    dispatch(removeSelectedComponent());
  }

  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
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
    </Space>
  );
};

export default EditToolbox;

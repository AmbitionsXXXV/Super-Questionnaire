import type { FC } from "react";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";
import {
  ComponentPropsType,
  getComponentConfByType
} from "@/components/QuestionComponents";
import { useDispatch } from "react-redux";
import { changeComponentProps } from "@/store/modules/components";

const NoProp: FC = () => {
  return <div className="text-center">未选中组件</div>;
};

const ComponentProp: FC = () => {
  const dispatch = useDispatch();

  const { selectedComponent } = useGetComponentInfo();
  if (selectedComponent == null) return <NoProp />;

  const { type, props, isLocked, isHidden } = selectedComponent;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return <NoProp />;

  const { PropComponent } = componentConf;

  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return;
    const { fe_id } = selectedComponent;

    dispatch(changeComponentProps({ fe_id, newProps }));
  }

  return (
    <PropComponent
      {...props}
      disabled={isLocked || isHidden}
      onChange={changeProps}
    />
  );
};

export default ComponentProp;

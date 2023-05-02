import { StateType } from "@/store";
import { ComponentsStateType } from "@/store/modules/components";
import { useSelector } from "react-redux";

function useGetComponentInfo() {
  const component = useSelector<StateType>(
    state => state.components
  ) as ComponentsStateType;

  const { componentList = [], selectedId } = component;

  return {
    componentList,
    selectedId
  };
}

export default useGetComponentInfo;

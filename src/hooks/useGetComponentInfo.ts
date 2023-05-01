import { StateType } from "@/store";
import { ComponentsStateType } from "@/store/modules/components";
import { useSelector } from "react-redux";

function useGetComponentInfo() {
  const component = useSelector<StateType>(
    state => state.components
  ) as ComponentsStateType;

  const { componentList = [] } = component;

  return {
    componentList
  };
}

export default useGetComponentInfo;

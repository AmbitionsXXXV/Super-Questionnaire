import { StateType } from "@/store"
import { ComponentsStateType } from "@/store/modules/components"
import { useSelector } from "react-redux"

function useGetComponentInfo() {
  const component = useSelector<StateType>(
    state => state.components
  ) as ComponentsStateType

  const { componentList = [], selectedId, copiedComponent } = component
  const selectedComponent = componentList.find(c => c.fe_id === selectedId)

  return {
    selectedId,
    componentList,
    copiedComponent,
    selectedComponent
  }
}

export default useGetComponentInfo

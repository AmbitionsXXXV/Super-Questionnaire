import type { FC } from "react"
import useLoadQuestionData from "@/hooks/useLoadQuestionData"
import { useDispatch } from "react-redux"
import { changeSelectedId } from "@/store/modules/components"
import { EditCanvas, EditHeader, LeftPanel, RightPanel } from "./components"

const Edit: FC = () => {
  const dispatch = useDispatch()
  const { loading } = useLoadQuestionData()

  function clearSelectedId() {
    dispatch(changeSelectedId(""))
  }

  return (
    <div className="flex flex-col h-screen bg-slate-200">
      <EditHeader />
      <div className="flex-auto py-3 px-0 h-left">
        <div className="my-0 mx-6 h-left flex">
          <div className="w-72 bg-white pt-2 pb-0 px-2 rounded-r-xl overflow-auto">
            <LeftPanel />
          </div>
          <div
            onClick={clearSelectedId}
            className="flex-1 relative h-full overflow-hidden"
          >
            <div className="absolute w-[400px] h-[640px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto shadow-md">
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className="w-80 bg-white pt-2 pb-0 px-2 rounded-l-xl">
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit

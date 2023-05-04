import type { FC } from "react";
import useLoadQuestionData from "@/hooks/useLoadQuestionData";
import EditCanvas from "./components/EditCanvas";
import { useDispatch } from "react-redux";
import { changeSelectedId } from "@/store/modules/components";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "@/pages/question/edit/components/RightPanel";

const Edit: FC = () => {
  const dispatch = useDispatch();
  const { loading } = useLoadQuestionData();

  function clearSelectedId() {
    dispatch(changeSelectedId(""));
  }

  return (
    <div className="flex flex-col h-screen bg-slate-200">
      <div className="h-7 bg-white">Header</div>
      <div className="flex-auto py-3 px-0">
        <div className="my-0 mx-6 h-full flex">
          <div className="w-72 bg-white pt-2 pb-0 px-2">
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
          <div className="w-80 bg-white pt-2 pb-0 px-2">
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;

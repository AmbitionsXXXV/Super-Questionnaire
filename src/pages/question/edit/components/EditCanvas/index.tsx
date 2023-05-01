import QuestionInput from "@/components/QuestionComponents/QuestionInput/component";
import QuestionTitle from "@/components/QuestionComponents/QuestionTitle/component";
import { Spin } from "antd";
import { FC } from "react";

type PropsType = {
  loading: boolean;
};

const EditCanvas: FC<PropsType> = ({ loading }) => {
  if (loading) {
    return (
      <div className="text-center mt-6">
        <Spin />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-full overflow-hidden">
      <div className="m-3 border border-solid border-white p-3 rounded hover:border-slate-300">
        {/* 屏蔽鼠标点击行为 */}
        <div className="pointer-events-none">
          <QuestionTitle />
        </div>
      </div>
      <div className="m-3 border border-solid border-white p-3 rounded hover:border-slate-300">
        {/* 屏蔽鼠标点击行为 */}
        <div className="pointer-events-none">
          <QuestionInput />
        </div>
      </div>
    </div>
  );
};

export default EditCanvas;

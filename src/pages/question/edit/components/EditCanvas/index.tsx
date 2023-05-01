import { Spin } from "antd";
import type { FC } from "react";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";
import { ComponentsInfoType } from "@/store/modules/components";
import { getComponentConfByType } from "@/components/QuestionComponents";

// import QuestionInput from "@/components/QuestionComponents/QuestionInput/component";
// import QuestionTitle from "@/components/QuestionComponents/QuestionTitle/component";

type PropsType = {
  loading: boolean;
};

function genComponent(componentInfo: ComponentsInfoType) {
  const { type, props } = componentInfo;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;
  const { Component } = componentConf;

  return <Component {...props} />;
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList } = useGetComponentInfo();

  if (loading) {
    return (
      <div className="text-center mt-6">
        <Spin />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-full overflow-hidden">
      {componentList.map(c => {
        const { fe_id } = c;
        return (
          <div
            key={fe_id}
            className="m-3 border border-solid border-white p-3 rounded hover:border-slate-300"
          >
            <div className="pointer-events-none">{genComponent(c)}</div>
          </div>
        );
      })}
      {/* <div className="m-3 border border-solid border-white p-3 rounded hover:border-slate-300"> */}
      {/* 屏蔽鼠标点击行为 */}
      {/* <div className="pointer-events-none">
          <QuestionTitle />
        </div>
      </div>
      <div className="m-3 border border-solid border-white p-3 rounded hover:border-slate-300"> */}
      {/* 屏蔽鼠标点击行为 */}
      {/* <div className="pointer-events-none">
          <QuestionInput />
        </div>
      </div> */}
    </div>
  );
};

export default EditCanvas;

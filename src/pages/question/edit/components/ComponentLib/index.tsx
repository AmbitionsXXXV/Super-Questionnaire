import {
  ComponentConfType,
  componentConfGroup
} from "@/components/QuestionComponents";
import { Typography } from "antd";
import type { FC } from "react";

const { Title } = Typography;

function genComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps } = c;

  return (
    <div
      key={type}
      className="mb-3 cursor-pointer bg-slate-100 border border-solid border-slate-200 p-3 rounded hover:border-slate-400"
    >
      <div className="pointer-events-none">
        <Component />
      </div>
    </div>
  );
}

const ComponentLib: FC = () => {
  return (
    <div>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group;

        return (
          <div key={groupId}>
            <Title
              level={3}
              className={`${index > 0 ? "mt-4" : "mt-0"} text-base important`}
            >
              {groupName}
            </Title>
            <div>{components.map(c => genComponent(c))}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ComponentLib;

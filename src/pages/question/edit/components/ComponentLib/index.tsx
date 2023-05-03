import { componentConfGroup } from "@/components/QuestionComponents";
import { Typography } from "antd";
import type { FC } from "react";

const { Title } = Typography;

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
            {/* <div>{components.map(c => genComponent(c))}</div> */}
          </div>
        );
      })}
    </div>
  );
};

export default ComponentLib;

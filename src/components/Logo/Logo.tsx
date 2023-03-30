import { Space, Typography } from "antd";
import type { FC } from "react";
import {} from "react";
import { CodeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { HOME_PATHNAME } from "@/router";

const { Title } = Typography;

const Logo: FC = () => {
  return (
    <div className="w-200 px-0 my-3 text-center leading-none">
      <Link to={HOME_PATHNAME}>
        <Space>
          <Title>
            <CodeOutlined className="text-white" />
          </Title>
          <Title style={{ color: "white", margin: 0, fontSize: "32px" }}>
            超级问卷
          </Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;

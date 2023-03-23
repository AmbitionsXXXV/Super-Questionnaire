import { Space, Typography } from "antd";
import type { FC } from "react";
import {} from "react";
import { CodeOutlined } from "@ant-design/icons";
import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";
import { HOME_PATHNAME } from "@/router";

const { Title } = Typography;

const Logo: FC = () => {
  return (
    <div className={styles.container}>
      <Link to={HOME_PATHNAME}>
        <Space>
          <Title>
            <CodeOutlined />
          </Title>
          <Title>超级问卷</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;

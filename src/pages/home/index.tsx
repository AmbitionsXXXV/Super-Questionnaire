import {} from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { MANAGE_INDEX_PATHNAME } from "@/router";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

const Home: FC = () => {
  const nav = useNavigate();

  // function clickHandler() {
  //   // nav("/login");
  //   nav({
  //     pathname: "/login"
  //   });
  // }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 3636 份</Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;

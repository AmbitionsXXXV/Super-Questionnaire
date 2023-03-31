import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { MANAGE_INDEX_PATHNAME } from "@/router";
import axios from "axios";

const { Title, Paragraph } = Typography;

const Home: FC = () => {
  const navigator = useNavigate();

  useEffect(() => {
    fetch("/api/test")
      .then(res => res.json())
      .then(res => console.log(res));
    // axios.get("/api/test").then(res => console.log(res));
  }, []);

  // function clickHandler() {
  //   // nav("/login");
  //   nav({
  //     pathname: "/login"
  //   });
  // }

  return (
    <div className="h-login flex flex-col justify-center items-center bg-gradient">
      <div className="text-center">
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 3636 份</Paragraph>
        <div>
          <Button
            type="primary"
            onClick={() => navigator(MANAGE_INDEX_PATHNAME)}
            className="h-14 text-[24px]"
          >
            开始使用
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;

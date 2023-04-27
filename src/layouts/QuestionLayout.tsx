import useLoadUserData from "@/hooks/useLoadUserData";
import useNavPage from "@/hooks/useNavPage";
import { Spin } from "antd";
import type { FC } from "react";
import { Outlet } from "react-router-dom";

const QuestionLayout: FC = () => {
  // 加载用户信息
  const { waitingUserData } = useLoadUserData();
  // 用户没有登录时，跳转到登录页
  useNavPage(waitingUserData);

  return (
    <div className="h-screen">
      {waitingUserData ? (
        <div className="text-center mt-15">
          <Spin />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default QuestionLayout;

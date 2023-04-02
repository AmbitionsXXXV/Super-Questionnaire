import { LOGIN_PATHNAME } from "@/router";
import { getUserInfoService } from "@/service/user";
import { removeToken } from "@/utils/user-token";
import { UserOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, message } from "antd";
import type { FC } from "react";
import {} from "react";
import { Link, useNavigate } from "react-router-dom";

const UserInfo: FC = () => {
  const navigator = useNavigate();
  const { data } = useRequest(getUserInfoService);
  const { username, nickname } = data ?? {};

  function logout() {
    // dispatch(logoutReducer()); // 清空了 redux user 数据
    removeToken(); // 清除 token 的存储
    message.success("退出成功");
    navigator(LOGIN_PATHNAME);
  }

  const UserInfo = (
    <>
      <span className="text-gray-300">
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  );

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>;

  return <div>{username ? UserInfo : Login}</div>;
};

export default UserInfo;

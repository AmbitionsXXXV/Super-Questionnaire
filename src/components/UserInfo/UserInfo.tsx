import { LOGIN_PATHNAME } from "@/router";
import type { FC } from "react";
import {} from "react";
import { Link } from "react-router-dom";

const UserInfo: FC = () => {
  // Todo:已经登录显示内容

  return (
    <>
      <Link to={LOGIN_PATHNAME}>UserInfo</Link>
    </>
  );
};

export default UserInfo;

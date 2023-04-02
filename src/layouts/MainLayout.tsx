import { Layout, Spin } from "antd";
import type { FC } from "react";
import { Outlet } from "react-router-dom";
import Logo from "@/components/Logo/Logo";
import UserInfo from "@/components/UserInfo/UserInfo";
import useLoadUserData from "@/hooks/useLoadUserData";
import useNavPage from "@/hooks/useNavPage";

const { Header, Footer, Content } = Layout;

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);

  return (
    <Layout>
      <Header className="header px-6 flex justify-between items-center">
        <div className="left inline-block">
          <Logo />
        </div>
        <div className="right inline-block">
          <UserInfo />
        </div>
      </Header>
      <Layout className="l-main">
        <Content>
          {waitingUserData ? (
            <div className="text-center mt-15">
              <Spin />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
      <Footer className="text-center bg-slate-100 border-t-2 border-gray-200">
        超级问卷 &copy;.Created by Etcetera
      </Footer>
    </Layout>
  );
};

export default MainLayout;

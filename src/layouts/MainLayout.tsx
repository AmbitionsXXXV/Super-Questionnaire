import { Layout } from "antd";
import type { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import Logo from "@/components/Logo/Logo";
import UserInfo from "@/components/UserInfo/UserInfo";

const { Header, Footer, Content } = Layout;

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Layout className={styles.main}>
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <Footer className={styles.footer}>超级问卷 &copy;.Created by Etcetera</Footer>
    </Layout>
  );
};

export default MainLayout;

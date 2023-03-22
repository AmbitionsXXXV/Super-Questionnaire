import type { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./ManageLayout.module.scss";

const ManageLayout: FC = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <p>ManageLayout Left</p>
          <button>创建问卷</button>
          <br />
          <a href="#">我的问卷</a>
          <br />
          <a href="#">星标问卷</a>
          <br />
          <a href="#">回收站</a>
        </div>
        <div className={styles.right}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ManageLayout;

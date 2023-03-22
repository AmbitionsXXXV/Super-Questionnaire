import type { FC } from "react";
import { Outlet } from "react-router-dom";

const MainLayout: FC = () => {
  return (
    <>
      <div>MainLayout Header</div>
      <div>
        <Outlet />
      </div>
      <div>MainLayout Footer</div>
    </>
  );
};

export default MainLayout;

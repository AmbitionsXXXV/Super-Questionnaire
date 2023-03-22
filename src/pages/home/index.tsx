import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import {} from "react";
import { Link } from "react-router-dom";

const Home: FC = () => {
  const nav = useNavigate();

  function clickHandler() {
    // nav("/login");
    nav({
      pathname: "/login"
    });
  }

  return (
    <>
      <div>Home</div>
      <div>
        <button onClick={clickHandler}>登陆</button>
        <Link to="/register">注册</Link>
      </div>
    </>
  );
};

export default Home;

import MainLayout from "@/layouts/MainLayout";
import ManageLayout from "@/layouts/ManageLayout";
import QuestionLayout from "@/layouts/QuestionLayout";
import NotFound from "@/pages/NotFount";
import Home from "@/pages/home";
import Login from "@/pages/login";
import List from "@/pages/manage/List";
import Star from "@/pages/manage/star";
import Trash from "@/pages/manage/trash";
import Edit from "@/pages/question/edit";
import Stat from "@/pages/question/stat";
import Register from "@/pages/register";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "manage",
        element: <ManageLayout />,
        children: [
          {
            path: "list",
            element: <List />
          },
          {
            path: "star",
            element: <Star />
          },
          {
            path: "trash",
            element: <Trash />
          }
        ]
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  },
  {
    path: "question",
    element: <QuestionLayout />,
    children: [
      {
        path: "stat/:id",
        element: <Stat />
      },
      {
        path: "edit/:id",
        element: <Edit />
      }
    ]
  }
]);

export const HOME_PATHNAME = "/";
export const LOGIN_PATHNAME = "/login";
export const REGISTER_PATHNAME = "/register";
export const MANAGE_INDEX_PATHNAME = "/manage/list";
export default router;

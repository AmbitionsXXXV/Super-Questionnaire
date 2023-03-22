import { RouterProvider } from "react-router-dom";
import router from "@/router";
import "antd/dist/reset.css";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

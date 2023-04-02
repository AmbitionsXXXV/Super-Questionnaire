import { configureStore } from "@reduxjs/toolkit";
import user from "./modules/user";

export default configureStore({
  reducer: {
    user
  }
});

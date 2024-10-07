import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./features/task/taskSlice";
import authReducer from "../lib/features/auth/authSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      task: taskReducer,
      auth: authReducer,
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];

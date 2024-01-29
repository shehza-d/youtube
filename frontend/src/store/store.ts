import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
// import goalReducer from '../features/goals/goalSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // goals: goalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

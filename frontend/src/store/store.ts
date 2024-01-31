import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
// import darkModeReducer from '../features/darkModes/darkModeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // darkMode: darkModeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

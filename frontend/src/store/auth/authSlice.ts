import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types";

interface IAuthState {
  user: null | IUser;
  isUserLoggedIn: null | boolean;
}

const initialState: IAuthState = {
  user: null,
  isUserLoggedIn: null,
};

const reducers = {
  addUser: (state: IAuthState, action: PayloadAction<IUser>) => {
    state.user = action.payload;
    state.isUserLoggedIn = true;
  },
  removeUser: (state: IAuthState) => {
    state.user = null;
    state.isUserLoggedIn = false;
  },
};

export const authSlice = createSlice({ name: "auth", initialState, reducers });

export const { addUser, removeUser } = authSlice.actions;

export const authReducer = authSlice.reducer;

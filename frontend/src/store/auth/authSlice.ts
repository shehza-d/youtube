import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { authService } from "./authService";
import { IUser } from "../../types";

interface IAuthState {
  user: null | IUser;
  isUserLoggedIn: null | boolean;
  isSuccess: boolean;
  isLoading: boolean;
  errorMessage: string;
}

const initialState: IAuthState = {
  user: null,
  isUserLoggedIn: null,
  isSuccess: false,
  isLoading: false,
  errorMessage: "",
};

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (
    user: {
      email: string;
      password: string;
    },
    thunkAPI,
  ) => {
    try {
      return await authService.login(user);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Testing Ping
export const wasUserLoggedIn = createAsyncThunk(
  "auth/ping",
  async (user, thunkAPI) => {
    try {
      return await authService.ping();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<IAuthState>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload as any;
        state.isUserLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = `${action.payload} `;
        state.user = null;
        state.isUserLoggedIn = false;
      })
      .addCase(wasUserLoggedIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        wasUserLoggedIn.fulfilled,
        (state, action: PayloadAction<IAuthState>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload as any;
          state.isUserLoggedIn = true;
        },
      )
      .addCase(wasUserLoggedIn.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = `${action.payload} `;
        state.user = null;
        state.isUserLoggedIn = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isUserLoggedIn = false;
      });
    // .addCase(logout.pending, (state) => {
    //   state.isLoading = true;
    // });
  },
});

export const { reset } = authSlice.actions;

export const authReducer = authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
    } catch {}
  },
);

export const login = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {},
);

export const logout = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {},
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isUpdatingPassword: false,
    isRequestingForToken: false,
    isCheckingAuth: true,
  },
  extraReducers: (builder) => {},
});

export default authSlice.reducer;

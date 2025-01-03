import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../Types/authType";
import axios from "axios";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem("user");
      });
  },
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/auth/login",
        { email, password },
        {
          method: "POST",
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        return await response.data;
      } else return rejectWithValue("Ошибка авторизации");
    } catch (error) {
      return rejectWithValue("Ошибка авторизации");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/auth/logout",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.status) {
        return await response.data;
      } else return rejectWithValue("Ошибка авторизации");
    } catch (error) {
      return rejectWithValue("Ошибка авторизации");
    }
  }
);

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

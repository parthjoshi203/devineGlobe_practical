import { createSlice } from "@reduxjs/toolkit";

const getInitialToken = () => {
  try {
    return localStorage.getItem("authToken") || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const initialState = {
  token: getInitialToken(),
  isAuthenticated: !!getInitialToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;

      try {
        localStorage.setItem("authToken", action.payload);
      } catch (error) {
        console.error(error);
      }
    },

    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;

      try {
        localStorage.removeItem("authToken");
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;

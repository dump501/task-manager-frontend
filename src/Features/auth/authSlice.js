import { createSlice } from "@reduxjs/toolkit";
import { readCookie, saveToCookie } from "../../helpers/uiHelpers";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(readCookie("user")),
    token: readCookie("at"),
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;

      // update cookies
      saveToCookie("at", accessToken);
      saveToCookie("user", JSON.stringify(user));
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;

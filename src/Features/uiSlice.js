import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isDrawerOpen: true,
    isAlertOpen: false,
    alertData: {
      type: "success",
      data: null,
    },
  },
  reducers: {
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    openDrawer: (state) => {
      state.isDrawerOpen = true;
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    setAlertData: (state, action) => {
      const { type, data } = action.payload;
      state.alertData.type = type;
      state.alertData.data = data;
    },
    setAlertOpen: (state, action) => {
      state.isAlertOpen = action.payload;
    },
  },
});

export const {
  closeDrawer,
  openDrawer,
  setAlertData,
  setAlertOpe,
  toggleDrawer,
  setAlertOpen,
} = uiSlice.actions;

export default uiSlice.reducer;

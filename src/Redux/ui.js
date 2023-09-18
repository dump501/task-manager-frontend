import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: "ui",
    initialState: {
        isDrawerOpen: true
    },
    reducers: {
        closeDrawer: (state)=>{
            state.isDrawerOpen = false
        },
        openDrawer: (state)=>{
            state.isDrawerOpen = true
        },
    }
}) 

export const {closeDrawer, openDrawer} = uiSlice.actions

export default uiSlice.reducer
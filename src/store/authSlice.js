// store for the authSlice
// createSlice() function from @reduxjs/toolkit is used to create a slice. The createSlice() function takes an object as an argument. This object has three properties:

import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();

export const initialState = {
    user: userInfo,
    status: userInfo ? true : false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.status = true;
        },
        logout: (state) => {
            state.user = null;
            state.status = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

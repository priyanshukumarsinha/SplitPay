// first, import configureStore from @reduxjs/toolkit
import { configureStore } from "@reduxjs/toolkit";

// import the authSlice
import authSlice from "./authSlice.js";

// export the store
export const store = configureStore({
    reducer: {
        auth : authSlice
    },
})


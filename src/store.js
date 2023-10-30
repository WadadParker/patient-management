import { configureStore } from "@reduxjs/toolkit";
import { wardsSlice } from "./features/wards/wardsSlice";

export default configureStore({
    reducer:{
        wards:wardsSlice.reducer
    }
})
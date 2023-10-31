import { configureStore } from "@reduxjs/toolkit";
import { wardsSlice } from "./features/wards/wardsSlice";
import { patientsSlice } from "./features/patients/patientsSlice";

export default configureStore({
    reducer:{
        wards:wardsSlice.reducer,
        patients:patientsSlice.reducer
    }
})
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const fetchPatients = createAsyncThunk("patients/fetchPatients", async () => {
    const response = await axios.get(`${apiUrl}/patients`);
    return response.data.patients;
});

export const addNewPatient = createAsyncThunk("patients/addPatient", async (newPatient) => {
    const response = await axios.post(`${apiUrl}/patients`, newPatient, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data.newPatient;
});

export const updatePatient = createAsyncThunk("patients/updatePatient", async (PatientDetails) => {
    const response = await axios.post(`${apiUrl}/patients/${PatientDetails._id}`, PatientDetails, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data.updatedPatient;
});

export const deletePatient = createAsyncThunk("patients/deletePatient", async (PatientId) => {
    const response = await axios.delete(`${apiUrl}/patients/${PatientId}`, {
        headers: {
            'Content-type': 'application/json',
        },
    });
    return response.data.deletedPatient;
});

const initialState ={
    patients:[],
    status:"idle",
    error:null,
}

export const patientsSlice = createSlice({name:"patients",initialState,reducers:{},extraReducers:{

    [fetchPatients.pending]: (state) =>{
        state.status = "idle"
    },
    [fetchPatients.fulfilled]: (state,action) => 
    {
        state.status = "success";
        state.patients = action.payload;
    },
    [fetchPatients.rejected]: (state,action)=>
    {
        state.status = "error";
        state.error = action.error.message;
    },

    [addNewPatient.pending]: (state) =>
    {
        state.status = "idle"
    },
    [addNewPatient.fulfilled]: (state,action)=>
    {
        state.status = "success";
        state.patients.push(action.payload);
    },
    [addNewPatient.rejected]: (state,action) =>
    {
        state.state="error";
        state.error= action.error.message;
    },

    [updatePatient.pending]: (state)=>
    {
        state.status = "idle"
    },
    [updatePatient.fulfilled]: (state,action)=>
    {
        state.success = "success";
        const updatedPatient = action.payload;

        const index = state.patients.findIndex(Patient=>Patient._id === updatedPatient._id);
        if(index !== -1)
        {
            state.patients[index] = updatedPatient;
        }
    },
    [updatePatient.rejected]: (state,action)=>
    {
        state.status="error";
        state.error = action.error.message;
    },

    [deletePatient.pending]: (state)=>
    {
        state.status = "idle"
    },
    [deletePatient.fulfilled]: (state,action)=>
    {
        state.status = "success",
        state.patients = [...state.patients].filter(Patient=>Patient._id!== action.payload._id)
    },
    [deletePatient.rejected]: (state,action)=>
    {
        state.status = "error",
        state.error = action.error.message
    }

}})
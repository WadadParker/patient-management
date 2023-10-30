import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const fetchPatients = createAsyncThunk("patients/fetchPatients", async ()=>{
    const response = await fetch(`${apiUrl}/patients`)
    const data = response.json();
    return data.data.patients;
})

export const addNewPatient = createAsyncThunk("patients/addPatient" , async (newPatient)=>
{
    const response = await fetch(`${apiUrl}/patients`, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(newPatient)
    })
    const data = await response.json();
    return data.data.newPatient;
})

export const updatePatient = createAsyncThunk("patients/updatePatient" , async(PatientDetails)=>
{
    const response = await fetch(`${apiUrl}/patients/${PatientDetails._id}` , {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(PatientDetails)
    });
    const data = await response.json();

    return data.data.updatedPatient;
})

export const deletePatient = createAsyncThunk("patients/deletePatient", async(PatientId)=>
{
    const response = await fetch(`${apiUrl}/patients/${PatientId}`, {
        method:'DELETE',
        headers:{
            'Content-type':'application/json',
        },
    })
    const data = await response.json();
    return data.data.deletedPatient;
})

const initialState ={
    patients:[],
    status:"idle",
    error:null,
}

export const patientsSlice = createSlice({name:"patients",initialState,reducers:{},extraReducers:{

    [fetchPatients.pending]: (state) =>{
        state.status = "idle"
    },
    [fetchPatients.fulfilled]: (state) => 
    {
        state.status = "success";
        state.patients = action.payload;
    },
    [fetchPatients.rejected]: (state)=>
    {
        state.status = "error";
        state.error = action.error.message;
    },

    [addNewPatient.pending]: (state) =>
    {
        state.status = "idle"
    },
    [addNewPatient.fulfilled]: (state)=>
    {
        state.status = "success";
        state.patients.push(action.payload);
    },
    [addNewPatient.rejected]: (state) =>
    {
        state.state="error";
        state.error= action.error.message;
    },

    [updatePatient.pending]: (state)=>
    {
        state.status = "idle"
    },
    [updatePatient.fulfilled]: (state)=>
    {
        state.success = "success";
        const updatedPatient = action.payload;

        const index = state.patients.findIndex(Patient=>Patient._id === updatedPatient._id);
        if(index !== -1)
        {
            state.patients[index] = updatedPatient;
        }
    },
    [updatePatient.rejected]: (state)=>
    {
        state.status="error";
        state.error = action.error.message;
    },

    [deletePatient.pending]: (state)=>
    {
        state.status = "idle"
    },
    [deletePatient.fulfilled]: (state)=>
    {
        state.status = "success",
        state.patients = [...state.patients].filter(Patient=>Patient._id!== action.payload._id)
    }

}})
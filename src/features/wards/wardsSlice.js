import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const fetchWards = createAsyncThunk("wards/fetchWards", async ()=>{
    const response = await fetch(`${apiUrl}/wards`)
    const data = response.json();
    return data.data.wards;
})

export const addNewWard = createAsyncThunk("wards/addWard" , async (newWard)=>
{
    const response = await fetch(`${apiUrl}/wards`, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(newWard)
    })
    const data = await response.json();
    return data.data.newWard;
})

export const updateWard = createAsyncThunk("wards/updateWard" , async(wardDetails)=>
{
    const response = await fetch(`${apiUrl}/wards/${wardDetails._id}` , {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(wardDetails)
    });
    const data = await response.json();

    return data.data.updatedWard;
})

export const deleteWard = createAsyncThunk("wards/deleteWard", async(wardId)=>
{
    const response = await fetch(`${apiUrl}/wards/${wardId}`, {
        method:'DELETE',
        headers:{
            'Content-type':'application/json',
        },
    })
    const data = await response.json();
    return data.data.deletedWard;
})

const initialState ={
    wards:[],
    status:"idle",
    error:null,
}

export const wardsSlice = createSlice({name:"wards",initialState,reducers:{},extraReducers:{

    [fetchWards.pending]: (state) =>{
        state.status = "idle"
    },
    [fetchWards.fulfilled]: (state) => 
    {
        state.status = "success";
        state.wards = action.payload;
    },
    [fetchWards.rejected]: (state)=>
    {
        state.status = "error";
        state.error = action.error.message;
    },

    [addNewWard.pending]: (state) =>
    {
        state.status = "idle"
    },
    [addNewWard.fulfilled]: (state)=>
    {
        state.status = "success";
        state.wards.push(action.payload);
    },
    [addNewWard.rejected]: (state) =>
    {
        state.state="error";
        state.error= action.error.message;
    },

    [updateWard.pending]: (state)=>
    {
        state.status = "idle"
    },
    [updateWard.fulfilled]: (state)=>
    {
        state.success = "success";
        const updatedWard = action.payload;

        const index = state.wards.findIndex(ward=>ward._id === updatedWard._id);
        if(index !== -1)
        {
            state.wards[index] = updatedWard;
        }
    },
    [updateWard.rejected]: (state)=>
    {
        state.status="error";
        state.error = action.error.message;
    },

    [deleteWard.pending]: (state)=>
    {
        state.status = "idle"
    },
    [deleteWard.fulfilled]: (state)=>
    {
        state.status = "success",
        state.wards = [...state.wards].filter(ward=>ward._id!== action.payload._id)
    }

}})
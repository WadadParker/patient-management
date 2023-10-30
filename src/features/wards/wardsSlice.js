import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const fetchWards = createAsyncThunk("wards/fetchWards", async () => {
    try {
        const response = await axios.get(`${apiUrl}/wards`);
        // console.log(response.data.wards);
        return response.data.wards;
    } catch (error) {
        console.error('Error fetching wards:', error);
        throw error;
    }
});

export const addNewWard = createAsyncThunk("wards/addWard" , async (newWard) => {
    try {
        const response = await axios.post(`${apiUrl}/wards`, newWard, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data.newWard;
    } catch (error) {
        console.error('Error adding new ward:', error);
        throw error;
    }
});

export const updateWard = createAsyncThunk("wards/updateWard" , async (wardDetails) => {
    try {
        const response = await axios.post(`${apiUrl}/wards/${wardDetails._id}`, wardDetails, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data.updatedWard;
    } catch (error) {
        console.error('Error updating ward:', error);
        throw error;
    }
});

export const deleteWard = createAsyncThunk("wards/deleteWard", async (wardId) => {
    try {
        const response = await axios.delete(`${apiUrl}/wards/${wardId}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data.deletedWard;
    } catch (error) {
        console.error('Error deleting ward:', error);
        throw error;
    }
});


const initialState ={
    wards:[],
    status:"idle",
    error:null,
}

export const wardsSlice = createSlice({name:"wards",initialState,reducers:{},extraReducers:{

    [fetchWards.pending]: (state) =>{
        state.status = "idle"
    },
    [fetchWards.fulfilled]: (state , action) => 
    {
        state.status = "success";
        state.wards = action.payload;
    },
    [fetchWards.rejected]: (state, action)=>
    {
        state.status = "error";
        state.error = action.error.message;
    },

    [addNewWard.pending]: (state) =>
    {
        state.status = "idle"
    },
    [addNewWard.fulfilled]: (state, action)=>
    {
        state.status = "success";
        state.wards.push(action.payload);
    },
    [addNewWard.rejected]: (state,action) =>
    {
        state.state="error";
        state.error= action.error.message;
    },

    [updateWard.pending]: (state)=>
    {
        state.status = "idle"
    },
    [updateWard.fulfilled]: (state,action)=>
    {
        state.success = "success";
        const updatedWard = action.payload;

        const index = state.wards.findIndex(ward=>ward._id === updatedWard._id);
        if(index !== -1)
        {
            state.wards[index] = updatedWard;
        }
    },
    [updateWard.rejected]: (state,action)=>
    {
        state.status="error";
        state.error = action.error.message;
    },

    [deleteWard.pending]: (state)=>
    {
        state.status = "idle"
    },
    [deleteWard.fulfilled]: (state,action)=>
    {
        state.status = "success",
        state.wards = [...state.wards].filter(ward=>ward._id!== action.payload._id)
    },
    [deleteWard.rejected]: (state,action)=>
    {
        state.status = "error",
        state.error = action.error.message
    }

}})
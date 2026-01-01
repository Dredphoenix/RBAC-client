import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";

export const fetchMyProfile=createAsyncThunk(
    "user/fetchMyProfile",
    async( _,{rejectWithValue})=>{
       try{
        const res= await api.get("user/me");
        return res.data;
       }catch(err){
        return rejectWithValue(err.response?.data?.message || "Failed to fetch profile");
       }
    }
);

const userSlice =createSlice({
   name:"user",
    initialState:{
        profile:null,
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchMyProfile.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchMyProfile.fulfilled,(state,action)=>{
            state.loading=false;
            state.profile=action.payload;
            state.error=null;
        })
        .addCase(fetchMyProfile.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    },
});

export default userSlice.reducer;
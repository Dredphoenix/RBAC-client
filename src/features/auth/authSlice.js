import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const loginUser =createAsyncThunk(
 
    "auth/loginUser",
    async({email,password},thunkAPI)=>{

        try{
            const res= await api.post("users/login",{email,password});
            return res.data;
        }catch(error){
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);


//Auth Slice

const authSlice = createSlice({

    name:"auth",
    initialState:{
        user:JSON.parse(localStorage.getItem("user")) || null,
        token:localStorage.getItem("token") || null,
        loading:false,
        error:null,
    },
  reducers:{
    logout(state){
        state.user=null;
        state.token=null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(loginUser.pending,(state)=>{
        state.loading=true;
        state.error=null;
    }).addCase(loginUser.fulfilled,(state,action)=>{
        state.loading=false;
        state.user=action.payload.user;
        state.token=action.payload.token;
        localStorage.setItem("user",JSON.stringify(action.payload.user));
        localStorage.setItem("token",action.payload.token)
    }).addCase(loginUser.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    });
  },
});

export const {logout} =authSlice.actions;
export default authSlice.reducer;
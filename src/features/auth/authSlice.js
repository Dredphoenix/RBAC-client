import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { jwtDecode } from "jwt-decode";

export const loginUser =createAsyncThunk(
 
    "auth/loginUser",
    async({email,password},thunkAPI)=>{

        try{
            const res= await api.post("user/login",{email,password});
            return res.data;
        }catch(error){
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);


//Auth Slice

const tokenfromstorage=localStorage.getItem("token");

let user=null;
if(tokenfromstorage){
    try{
        const decoded=jwtDecode(tokenfromstorage);
        user={id:decoded.id,role:decoded.role};
    }catch{
         localStorage.removeItem("token");
    }
}


const authSlice = createSlice({

    name:"auth",
    initialState:{
        token:tokenfromstorage || null,
        user:user,
        isAuthenticated:!!user,
        loading:false,
        error:null,
    },
  reducers:{
    logout(state){
       state.token = null;
       state.user = null;
       state.isAuthenticated = false;
       localStorage.removeItem("token");
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(loginUser.pending,(state)=>{
        state.loading=true;
        state.error=null;
    }).addCase(loginUser.fulfilled,(state,action)=>{
        state.loading=false;
        const token=action.payload.token;
        const decoded= jwtDecode(token);
        state.token=token;
        state.user={id:decoded.id,role:decoded.role};
        state.isAuthenticated=true;
        localStorage.setItem("token",token);
    }).addCase(loginUser.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    });
  },
});

export const {logout} =authSlice.actions;
export default authSlice.reducer;


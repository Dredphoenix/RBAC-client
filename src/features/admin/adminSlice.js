import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";

export const fetchUsers=createAsyncThunk(
    "admin/fetchUsers",
    async(_,{rejectWithValue})=>{
        try{
            const res =await api.get("/admin/users");
            return res.data;
        }catch(err){
            return rejectWithValue(err.response?.data?.message || "Failed to fetch users");
        }
    }
);


export const updateUserRole=createAsyncThunk(
    "admin/updateUserRole",
    async({userId,role},{rejectWithValue})=>{
        try{
            await api.patch(`/admin/users/${userId}`,{role});
            return {userId, role};
        }catch(err){
            return rejectWithValue(err.response?.data?.message || "Failed to update user role");
        }
    }
);

export const deleteUser =createAsyncThunk(
    "admin/deleteUser",
    async(userId,{rejectWithValue})=>{
        try{
            await api.delete(`/admin/users/${userId}`);
            return userId;
        }catch(err){
            return rejectWithValue(err.response?.data?.message || "Failed to delete user");
        }
    }
);

export const fetchUserById=createAsyncThunk(
    "admin/fetchUserById",
    async(userId,{rejectWithValue})=>{
        try{
            const res= await api.get(`/admin/users/${userId}`);
            return res.data;
        }catch(err){
            return rejectWithValue(err.response?.data?.message || "Failed to fetch user");
        }
    }
);

const adminSlice =createSlice({
    name:"admin",
    initialState:{
        users:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder 
      .addCase(fetchUsers.pending,(state)=>{
        state.loading=true;
      })
      .addCase(fetchUsers.fulfilled,(state,action)=>{
        state.loading=false;
        state.users= action.payload;
        state.error=null;
      })
      .addCase(fetchUsers.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
      })
      .addCase(updateUserRole.fulfilled,(state,action)=>{
        const {userId, role} = action.payload;
        const idx =state.users.findIndex(user=>user._id===userId);
        if(idx !==-1) state.users[idx].role = role;
      })
      .addCase(deleteUser.fulfilled,(state,action)=>{
        state.users=state.users.filter(user=>user._id !== action.payload);
      })
      .addCase(fetchUserById.pending,(state)=>{
        state.loading=true;
      })
      .addCase(fetchUserById.fulfilled,(state,action)=>{
        state.loading=false; 
        state.selectedUser= action.payload;
        state.error=null;
      })
      .addCase(fetchUserById.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
      });
    },
});

export default adminSlice.reducer;
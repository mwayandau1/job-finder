import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from '../../utils/axios'
import {toast} from 'react-toastify'
import { getUserFromLocalStorage, addUserToLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage";

const initialState = {
    isLoading:false,
    isSidebarOpen:false,
    user:getUserFromLocalStorage()
}

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async(user, thunkAPI)=>{
        try{
            const response = await customFetch.post('auth/register', user);
            return response.data;
        }
        catch (error){
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(user, thunkAPI)=>{
        try{
            const response = await customFetch.post('/auth/login',user )
            return response.data;
        }
        catch (error){
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
      toggleSidebar(state){
        state.isSidebarOpen=!state.isSidebarOpen
      },
      logoutUser(state){
        state.user = null;
        removeUserFromLocalStorage();
        state.isSidebarOpen = false;
      }

    },
    extraReducers: (builder) => {
        builder
          .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(registerUser.fulfilled, (state, { payload }) => {
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user)
            toast.success(`Hello There ${user.name}`);
          })
          .addCase(registerUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
          })
          .addCase(loginUser.pending, state=>{
            state.isLoading = true
          })
          .addCase(loginUser.fulfilled, (state, {payload})=>{
            const {user} = payload;
            state.user = user;
            addUserToLocalStorage(user)
            state.isLoading = false;
            toast.success(`Welcome back ${user.name}`)
          })
          .addCase(loginUser.rejected, (state, {payload})=>{
            state.isLoading= false;
            toast.error(payload)
          })
        }
})
export const {toggleSidebar, logoutUser} = userSlice.actions;
export default userSlice.reducer
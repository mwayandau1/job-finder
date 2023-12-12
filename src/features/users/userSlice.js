import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from '../../utils/axios'
import {toast} from 'react-toastify'
import { getUserFromLocalStorage, addUserToLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage";
import { registerUserThunk, loginUserThunkAPI, updateUserThunkAPI } from "./userThunk";

const initialState = {
    isLoading:false,
    isSidebarOpen:false,
    user:getUserFromLocalStorage()
}

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async(user, thunkAPI)=>registerUserThunk('auth/register', user, thunkAPI)
)
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(user, thunkAPI)=>loginUserThunkAPI('/auth/login', user, thunkAPI)
);
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async(user, thunkAPI)=>updateUserThunkAPI('/auth/updateUser', user, thunkAPI)
)
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
      toggleSidebar(state){
        state.isSidebarOpen=!state.isSidebarOpen
      },
      logoutUser(state, {payload}){
        state.user = null;
        removeUserFromLocalStorage();
        state.isSidebarOpen = false;
        if(payload){
          toast.info(payload)
        }
      }

    },
    extraReducers: (builder) => {
        builder
        // REGISTER USER CASE
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
          // LOGIN USER CASE
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
          // UPDATE USER CASE
          .addCase(updateUser.pending, (state)=>{
            state.isLoading = true;
          })
          .addCase(updateUser.fulfilled, (state, {payload})=>{
            const {user} = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user)
            toast.success("User updated!")
          })
          .addCase(updateUser.rejected, (state, {payload})=>{
            state.isLoading = false;
            toast.error(payload)
          })
        }
})
export const {toggleSidebar, logoutUser} = userSlice.actions;
export default userSlice.reducer
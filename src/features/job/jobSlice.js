import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import {toast} from 'react-toastify'
import { logoutUser } from "../users/userSlice";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { showLoading, hideLoading, getAllJobs } from "./allJobs/allJobsSlice";
// import { FaThermometerThreeQuarters } from "react-icons/fa";


const initialState = {
    isLoading :false,
    position:'',
    company:'',
    jobLocation:'',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType:'full-time',
    statusOptions:['interview', 'declined', 'pending'],
    status:'pending',
    isEditing:false,
    editJobId:''
}
export const createJob = createAsyncThunk(
    'job/createJob',
    async(job, thunkAPI)=>{
        try{
            const response =await customFetch.post('/jobs', job, {
                headers:{
                    authorization:`Bearer ${thunkAPI.getState().user.user.token}`
                }
            });
            thunkAPI.dispatch(clearValues());
            return response.data;
            toast.success("Job created successfully")
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response.data.msg)
            if(error.response.status === 401){
                thunkAPI.dispatch(logoutUser());
                return thunkAPI.rejectWithValue("You are unauthorized here. Logging you out...")

            }
        }
    }
);

export const deleteJob = createAsyncThunk(
    'job/deleteJob',
    async(jobId, thunkAPI)=>{
        thunkAPI.dispatch(showLoading())
        try{
            const response = await customFetch.delete(`/jobs/${jobId}`,{
                headers:{
                    authorization:`Bearer ${thunkAPI.getState().user.user.token}`
                }
            });
            thunkAPI.dispatch(getAllJobs())
            return response.data.msg
        }
        catch(error){
            thunkAPI.dispatch(hideLoading())
            thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
);

export const editJob = createAsyncThunk(
    'job/editJob',
    async({jobId,job}, thunkAPI)=>{
        try{
            const response = await customFetch.patch(`/jobs/${jobId}`, job,{
                headers:{
                    authorization:`Bearer ${thunkAPI.getState().user.user.token}`
                }
            });
            thunkAPI.dispatch(clearValues())
            return response.data
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }

    }
)

const jobSlice = createSlice({
    name:'job',
    initialState,
    reducers:{
        handleChange(state, {payload:{name, value}}){
            state[name] = value
        },
        clearValues: ()=>{
            return {...initialState,
                jobLocation:getUserFromLocalStorage()?.location || ''}
        },
        setEditJob(state, {payload}){
            return {...state, isEditing:true, ...payload}
        }
    },
    extraReducers:(builder)=>{
        builder
        // CREATE JOB
        .addCase(createJob.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createJob.fulfilled, (state)=>{
            state.isLoading = false;
            toast.success("Job created!")
        })
        .addCase(createJob.rejected, (state, {payload})=>{
            state.isLoading = false;
            toast.error(payload)
        })
        // DELETE EXTRAS
        .addCase(deleteJob.fulfilled, ({payload})=>{
            toast.success(payload)
        })
        .addCase(deleteJob.rejected, (state, {payload})=>{
            toast.error(payload)
        })
        // EDIT JOB
        .addCase(editJob.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(editJob.fulfilled, (state)=>{
            state.isLoading = false;
            toast.success("Job modified...")
        })
        .addCase(editJob.rejected, (state, {payload})=>{
            state.isLoading = false;
            toast.error(payload)
        })
    }
});

export const {handleChange, clearValues, setEditJob} = jobSlice.actions;


export default jobSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils/axios";
import { FaThumbsDown } from "react-icons/fa";
import { toast } from "react-toastify";

const initialFilterState = {
    search:'',
    searchStatus:'all',
    searchType:'all',
    sort:'latest',
    sortOptions:['latest', 'older', 'a-z','z-a']
};
const initialState = {
    isLoading:false,
    jobs:[],
    totalJobs:0,
    numOfPages:1,
    page:1,
    stats:{},
    monthlyApplications:[],
    ...initialFilterState
}

export const getAllJobs = createAsyncThunk(
    'job/getJobs',
    async(state, thunkAPI)=>{
        const url = `/jobs`
        try{
            const response = await customFetch.get(url, {
                headers:{
                    authorization:`Bearer ${thunkAPI.getState().user.user.token}`
                }
            })
            return response.data
        }
        catch(error){
            thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)
const allJobsSlice = createSlice({
    name:'allJobs',
    reducers:{
        showLoading(state){
            state.isLoading = true
        },
        hideLoading(state){
            state.isLoading = false;
        }
    },
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(getAllJobs.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getAllJobs.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            state.jobs = payload.jobs;
            console.log(payload.jobs)
        })
        .addCase(getAllJobs.rejected, (state, {payload})=>{
            state.isLoading = false;
            toast.error(payload)
        })
    }
});

export const {showLoading, hideLoading} = allJobsSlice.actions;
export default allJobsSlice.reducer;
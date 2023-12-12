import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/userSlice'
import jobReducer from './features/job/jobSlice';
import allJobsReducer from './features/job/allJobs/allJobsSlice';

const store = configureStore({
    reducer:{
        user:userReducer,
        job:jobReducer,
        allJobs:allJobsReducer
    }
  })


  export default store;
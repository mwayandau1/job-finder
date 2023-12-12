import customFetch from "../../utils/axios"
import { logoutUser } from "./userSlice";
export const registerUserThunk = async(url, user, thunAPI)=>{
    try{
        const response = await customFetch.post(url, user);
        return response.data
    }
    catch (error){
        return thunAPI.rejectWithValue(error.response.data.msg)
    }
}


export const loginUserThunkAPI = async (url, user, thunAPI)=>{
    try{
    const response = await customFetch.post(url, user);
    return response.data
}
catch(error){
    return thunAPI.rejectWithValue(error.response.data.msg)
}
}

export const updateUserThunkAPI = async(url, user, thunAPI)=>{
    try{
        const response = await customFetch.patch(url, user, {
            headers:{
                authorization:`Bearer ${thunAPI.getState().user.user.token}`
            }
        })
        return response.data
    }
    catch(error){
        if(error.response.status === 401){
            thunAPI.dispatch(logoutUser())
            return thunAPI.rejectWithValue("Unauthorized, Logging out...")

        }
        return thunAPI.rejectWithValue(error.response.data.msg)
    }
}
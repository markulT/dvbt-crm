import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import api from "@/api/authApi";
import axios from "axios";

type ILoginResponse = {
    email:string,
    accessToken:string,
    refreshToken:string
}

type ILoginRequest = {
    email:string,
    password:string
}

interface IAuthState {
    email:string,
    error:string
}

const initialState:IAuthState = {
    email:'',
    error:''
}

export const login = createAsyncThunk<any,any,any>('auth/login', async ({email, password}) => {

    const response = await axios.post<ILoginResponse>(`https://bee8-46-219-225-231.ngrok-free.app/api/v1/auth/login`, {email:email, password:password}, {withCredentials:true})
    sessionStorage.setItem('accessToken', response.data.accessToken)
    return response.data;
})
export const refresh = createAsyncThunk<any,any,any>('auth/refresh',async ()=>{

    const response = await axios.post(`${process.env.SERVER_URL}/api/v1/auth/refresh`, {}, {withCredentials:true})

    sessionStorage.setItem('accessToken', response.data.accessToken)
    return response.data;
})

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUserSuccess(state, action:PayloadAction<string>) {
            state.email = action.payload
        },
        setUserError(state, action:PayloadAction<string>) {
            state.error = action.payload
        }
    },
    extraReducers:{
        [login.fulfilled.type]: (state, action:PayloadAction<ILoginResponse>) => {
            state.email = action.payload.email
        },
        [refresh.fulfilled.type]:(state, action:PayloadAction<ILoginResponse>) => {
            state.email = action.payload.email
        }
    }
})
export default authSlice.reducer

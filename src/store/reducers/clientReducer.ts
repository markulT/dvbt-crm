import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import api from "../../api/authApi";
import {act} from "react-dom/test-utils";
import axios from "axios";
import {logAppDirError} from "next/dist/server/dev/log-app-dir-error";
import {IClient, IFullClient} from "@/store/models/IClient";


interface IClientState {
    clientList:IClient[],
    currentClient:IFullClient,
    loading:boolean,
    error:string,
    length:number
}

const initialState:IClientState = {
    clientList:<IClient>[] as IClient[],
    currentClient:null as IFullClient,
    loading:false,
    error:'',
    length:0
}

interface IGetPage {
    pageSize:number,
    pageNumber:number
}

interface IGetClient {
    id:string
}
interface IDeleteClient {
    id:string
}
interface IPage<T> {
    page:T[],
    length:number
}

export const getPageClients = createAsyncThunk('client/getPage', async (body:IGetPage)=>{
    const response = await api.get<IPage<IClient>>(`http://localhost:8000/api/v1/users/page?pageSize=${body.pageSize}&pageNumber=${body.pageNumber}`)
    return response.data;
})
export const getClient = createAsyncThunk('client/get', async (body:IGetClient)=>{
    const response = await api.get<IFullClient>(`${process.env.SERVER_URL}/api/v1/users/userInfo/${body.id}`);
    return response.data;
})
export const deleteClient = createAsyncThunk('client/delete', async(body:IDeleteClient)=>{
    const response = await api.delete(`${process.env.SERVER_URL}/api/v1/users/delete/${body.id}`);
    return null;
})

export const clientSlice = createSlice({
    reducers: {
        setCurrentClient(state, action:PayloadAction<IFullClient>) {
            state.currentClient = action.payload;
        }
    },
    name:"client",
    initialState,
    extraReducers:{
        [getPageClients.pending.type]: (state) => {
            state.loading = true;
        },
        [getPageClients.fulfilled.type]: (state, action:PayloadAction<IPage<IClient>>) => {
            state.clientList = action.payload.page;
            state.length = action.payload.length;
        },
        [getPageClients.rejected.type]: (state, action:PayloadAction<string>) => {
            state.error = action.payload
        },
        [getClient.fulfilled.type]:(state, action:PayloadAction<IFullClient>) => {
            state.currentClient = action.payload
        }
    }
})
export default clientSlice.reducer;
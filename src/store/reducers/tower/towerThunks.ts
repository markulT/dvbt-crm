import {createAsyncThunk} from "@reduxjs/toolkit";
import {Tower} from "@/store/models/Tower";
import api from "@/api/authApi";
import {GetByIdRequest} from "@/store/types/getByIdRequest";


export const createTower = createAsyncThunk('tower/create', async (body:Tower) => {
    const response = await api.post(`${process.env.SERVER_URL}/api/v1/towers/create`, body)
    return response.data;
})

export const getAll = createAsyncThunk('tower/getAll', async ()=>{
    const response = await api.get(`${process.env.SERVER_URL}/api/v1/towers/all`)
    return response.data;
})

export const getSingle = createAsyncThunk('tower/get', async (body:GetByIdRequest)=>{
    const response = await api.get(`${process.env.SERVER_URL}/api/v1/towers/${body.id}`);
    return response.data
})
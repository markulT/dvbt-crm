import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "@/api/authApi";
import {GetPageRequest} from "@/store/types/GetPage";
import {GetByIdRequest} from "@/store/types/getByIdRequest";



export const getAllEngineers = createAsyncThunk("engineer/getAll", async (body:GetPageRequest) => {
    const response = await api.get(`${process.env.SERVER_URL}/api/v1/engineer/page?pageNumber=${body.pageNumber}&pageSize=${body.pageSize}`)
    return response.data;
})

export const deleteEngineerThunk = createAsyncThunk("engineer/delete", async (body:GetByIdRequest)=> {
    const response = await api.delete(`${process.env.SERVER_URL}/api/v1/engineer/delete/${body.id}`)
    return response.data
})
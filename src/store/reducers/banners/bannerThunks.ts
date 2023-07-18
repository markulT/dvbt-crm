import {createAsyncThunk} from "@reduxjs/toolkit";
import {GetPageRequest} from "@/store/types/GetPage";
import api from "@/api/authApi";
import {Banner} from "@/store/models/Banner";
import {GetByIdRequest} from "@/store/types/getByIdRequest";
import axios from "axios";
import {UpdateItem} from "@/store/types/updateItem";


export const getBannerPage = createAsyncThunk("banner/page", async (body:GetPageRequest)=>{
    const response = await api.get(`${process.env.SERVER_URL}/api/v1/banner/page?pageNumber=${body.pageNumber}&pageSize=${body.pageSize}`)
    console.log(response.data)
    return response.data
})

export const createBanner = createAsyncThunk('banner/create', async (body:Banner)=>{
    const response = await api.post(`${process.env.SERVER_URL}/api/v1/banner`, body)
    return null;
})

export const deleteBanner = createAsyncThunk('banner/delete', async (body:GetByIdRequest) => {
    const response = await api.delete(`${process.env.SERVER_URL}/api/v1/banner/${body.id}`)
    return null;
})

//@ts-ignore
export const updateBannerImage = createAsyncThunk('banner/updateImage', async ({formData})=>{
    const response = await api.put(`${process.env.SERVER_URL}/api/v1/banner/setImage`, formData)
    return response.data;
})

interface BannerImage {
    imgName:string
}

export const getBannerImage = createAsyncThunk("banner/getImage", async (body:BannerImage)=> {
    const response = await axios.get(`${process.env.SERVER_URL}/api/v1/banner/image/${body.imgName}`, {responseType:"blob"})
    const imgUrl = URL.createObjectURL(response.data)
    return imgUrl
})

export const updateBanner = createAsyncThunk("banner/update", async (body:UpdateItem<any>)=>{
    const response = await api.put(`${process.env.SERVER_URL}/api/v1/banner`, body)
    return response.data
})
export const getBannerById = createAsyncThunk("banner/getSingle", async (body:GetByIdRequest)=>{
    const response = await api.get(`${process.env.SERVER_URL}/api/v1/banner/${body.id}`)
    return response.data
})
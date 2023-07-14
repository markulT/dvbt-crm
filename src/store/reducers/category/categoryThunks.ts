import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "@/api/authApi";
import {ICategory} from "@/store/models/ICategory";
import {GetByIdRequest} from "@/store/types/getByIdRequest";
import axios from "axios";
import {GetPageRequest} from "@/store/types/GetPage";

export interface IGetCategories {
    list:ICategory[]
}

export interface IDeleteCategory {
    id:string
}

export interface ICreateCategory {
    name:string
}

export const getAllCategories = createAsyncThunk('category/getAll', async () => {
    const response = await api.get<IGetCategories>(`${process.env.SERVER_URL}/api/v1/products/getAll/categories`);
    console.log(response.data)
    return response.data;
})

export const createCategory = createAsyncThunk('category/create', async(body:ICreateCategory)=>{
    const response = await api.post(`${process.env.SERVER_URL}/api/v1/products/create/category`, {
        name:body.name
    })
    return null;
})

export const getCategory = createAsyncThunk('category/getSingle', async (body:GetByIdRequest)=>{
    const response = await api.get(`${process.env.SERVER_URL}/api/v1/products/category/${body.id}`)
    return response.data
})

interface AddComplementaryRequest {
    categoryId:string,
    productId:string
}

export const addComplementaryToCategory = createAsyncThunk('category/addComplementary', async (body:AddComplementaryRequest)=>{
    const response = await api.post(`${process.env.SERVER_URL}/api/v1/products/addComplementary/category`, body)
    return response.data
})

export const removeComplementaryFromCategory = createAsyncThunk('category/removeComplementary', async (body:AddComplementaryRequest)=> {
    const response = await api.put(`${process.env.SERVER_URL}/api/v1/products/removeComplementary/category`, body)
    return response.data
})

export const deleteCategoryThunk = createAsyncThunk('category/delete', async (body:IDeleteCategory) => {
    const response = await api.delete(`${process.env.SERVER_URL}/api/v1/products/delete/category/${body.id}`)
    return null;
})

export const getAllProducts = createAsyncThunk('category/getAllProducts', async ()=>{
    const response = await api.get(`${process.env.SERVER_URL}/api/v1/products/all`)
    return response.data.list
})

interface GetByCategoryPage {
    categoryId:string,
    page:GetPageRequest
}

export const getProductsByCategory = createAsyncThunk('category/getProductsByCategory', async(body:GetByCategoryPage)=>{
    const response = await axios.get(`${process.env.SERVER_URL}/api/v1/products/products/${body.categoryId}?pageNumber=${body.page.pageNumber}&pageSize=${body.page.pageSize}`)

    return response.data.page;
})
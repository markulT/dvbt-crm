import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "@/api/authApi";
import {ICategory} from "@/store/models/ICategory";

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

export const deleteCategoryThunk = createAsyncThunk('category/delete', async (body:IDeleteCategory) => {
    console.log(body.id)
    const response = await api.delete(`${process.env.SERVER_URL}/api/v1/products/delete/category/${body.id}`)
    return null;
})
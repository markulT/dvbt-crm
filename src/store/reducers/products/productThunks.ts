import {createAsyncThunk} from "@reduxjs/toolkit";
import {Product, ShortProduct} from "@/store/models/Product";
import api from "@/api/authApi";
import {GetByIdRequest} from "@/store/types/getByIdRequest";
import {UpdateItem} from "@/store/types/updateItem";



export const createProduct = createAsyncThunk('product/create',async (body:Product)=>{
    const response = await api.post(`${process.env.SERVER_URL}/api/v1/products/add`, {...body});
    return response.data;
})
export const createShortProduct = createAsyncThunk('product/createShort',async (body:ShortProduct)=>{
    console.log(body)
    const response = await api.post(`${process.env.SERVER_URL}/api/v1/products/addShort`, {...body});
    return response.data;
})


export const getSingleProduct = createAsyncThunk('product/get', async (body:GetByIdRequest) => {
    const response = await api.get<Product>(`${process.env.SERVER_URL}/api/v1/products/${body.id}`)
    console.log(response.data)
    return response.data;
})

export const getAllProducts = createAsyncThunk('product/getAll', async () => {
    const response = await api.get<Product[]>(`${process.env.SERVER_URL}/api/v1/products/all`)
    return response.data;
})

export const deleteProduct = createAsyncThunk('product/delete', async (body:GetByIdRequest)=> {
    const response = await api.delete(`${process.env.SERVER_URL}/api/v1/products/delete/${body.id}`);
    return response.data;
})

export const updateProduct = createAsyncThunk('product/update', async (body:UpdateItem<any>)=> {
    const response = await api.put<Product>(`${process.env.SERVER_URL}/api/v1/products/update/${body.id}`, {
        id:body.id,
        fieldValue:body.value,
        fieldToChange:body.field
    })
    return response.data;
})
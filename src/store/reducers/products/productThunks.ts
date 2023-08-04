import {createAsyncThunk} from "@reduxjs/toolkit";
import {Product, ShortProduct} from "@/store/models/Product";
import api from "@/api/authApi";
import {GetByIdRequest} from "@/store/types/getByIdRequest";
import {UpdateItem} from "@/store/types/updateItem";
import {abortControllerWithReason} from "@reduxjs/toolkit/dist/listenerMiddleware/utils";
import {GetSingle} from "@/store/types/getSingle";



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
    return response.data;
})

interface GetByIdOrderItem {
    id:string,
    quantity:number
}
//@ts-ignore
export const getProductAndPushToList = createAsyncThunk('product/getAndPush', async (body:GetByIdOrderItem)=> {
    const response = await api.get<GetSingle<Product>>(`${process.env.SERVER_URL}/api/v1/products/${body.id}`)
    return {
        product: response.data.item,
        quantity: body.quantity
    }
})

export const getProductByOrderItem = createAsyncThunk('product/getByOrderItem', async (body:GetByIdRequest)=> {
    const response = await api.get(`${process.env.SERVER_URL}/api/v1/products/orderItem/${body.id}`)
    return response.data
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
    console.log(typeof body.value)
    const response = await api.put<Product>(`${process.env.SERVER_URL}/api/v1/products/update/${body.id}`, {
        id:body.id,
        fieldValue:body.value,
        fieldToChange:body.field
    })
    return response.data;
})

//@ts-ignore
export const setProductImage = createAsyncThunk("product/setImage", async ({formData})=>{
    // body should contain both productId and file that you want to store
    const response = await api.put(`${process.env.SERVER_URL}/api/v1/products/image/update`, formData)
    return null;
})

export const getProductImage = createAsyncThunk("product/getImage", async (body:GetByIdRequest)=>{
    const response = await api.get(`${process.env.SERVER_URL}/api/v1/products/imageUrl/${body.id}`, {responseType:"blob"})
    // const imageUrl = URL.createObjectURL(response.data);
    console.log(URL.createObjectURL(response.data))
    return URL.createObjectURL(response.data);
})

interface UpdateProductCategory {
    categoryId:string,
    productId:string
}

export const updateProductCategory = createAsyncThunk("product/updateCategory", async (body: UpdateProductCategory)=>{
    const response = await api.put(`${process.env.SERVER_URL}/api/v1/products/update/category`,  body)
    return response.data
})
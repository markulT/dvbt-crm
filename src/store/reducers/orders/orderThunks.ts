import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "@/api/authApi";
import {GetPageRequest} from "@/store/types/GetPage";
import {GetByIdRequest} from "@/store/types/getByIdRequest";
import authApi from "@/api/authApi";


export const getAllOrders = createAsyncThunk("orders/getAll", async (body:GetPageRequest)=> {
    const response = await api.get(`${process.env.SERVER_URL}/api/v1/order/page?pageSize=${body.pageSize}&pageNumber=${body.pageNumber}`);
    return response.data;
})

interface createOrderBody {
    location:string
}

export enum OrderStatus {
    NOT_VIEWED,
    VIEWED,
    SENT,
    COMPLETE
}

interface UpdateOrderStatus {
    id:string,
    status:OrderStatus
}

export const createOrder = createAsyncThunk("orders/create", async (body:createOrderBody)=>{
    const response = await api.post(`${process.env.SERVER_URL}/api/v1/order/create`, body)
    return response.data;
})

export const deleteOrder = createAsyncThunk("orders/delete", async (body:GetByIdRequest)=> {
    const response = await api.delete(`${process.env.SERVER_URL}/api/v1/order/delete/${body.id}`)
    return null;
})

export const getOrderDetails = createAsyncThunk("orders/getDetails", async (body:GetByIdRequest)=>{
    const response = await api.get(`${process.env.SERVER_URL}/api/v1/order/${body.id}`)
    return response.data.item;
})



export const updateStatus = createAsyncThunk("orders/updateStatus", async (body:UpdateOrderStatus)=>{
    const response = await api.put(`${process.env.SERVER_URL}/api/v1/order/changeStatus`, {orderId:body.id, status:body.status})
    return response.data;
})
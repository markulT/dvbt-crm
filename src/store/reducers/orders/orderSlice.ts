import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFullOrder, IOrder} from "@/store/models/IOrders";
import {getAllOrders, getOrderDetails} from "@/store/reducers/orders/orderThunks";
import {GetPageResponse} from "@/store/types/GetPage";

interface OrdersState {
    list:IOrder[],
    currentOrder:IFullOrder,
    length:number,
    error:string
}

const initialState:OrdersState = {
    list:[],
    currentOrder: null as IFullOrder,
    length:0,
    error:''
}

export const orderSlice = createSlice({
    name:"orders",
    initialState,
    reducers:{
        setError() {}
    },
    extraReducers:{
        [getAllOrders.fulfilled.type]: (state, action:PayloadAction<GetPageResponse<IOrder>>) => {
            state.list = action.payload.page;
            state.length = action.payload.length;
        },
        [getOrderDetails.fulfilled.type]:(state, action:PayloadAction<IOrder>) => {
            state.currentOrder = action.payload;
        }
    }
})
export default orderSlice.reducer;
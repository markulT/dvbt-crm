import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CreateOrder, IFullOrder, IOrder} from "@/store/models/IOrders";
import {getAllOrders, getOrderDetails, intentOrder} from "@/store/reducers/orders/orderThunks";
import {GetPageResponse} from "@/store/types/GetPage";
import {Product} from "@/store/models/Product";
import {Payload} from "@react-spring/animated";
import productItem from "@/components/products/ProductItem";

interface OrdersState {
    list:IOrder[],
    currentOrder:IFullOrder,
    length:number,
    error:string,
    clientSecret:string,
    createOrder:CreateOrder
}

const initialState:OrdersState = {
    list:[],
    currentOrder: null as IFullOrder,
    length:0,
    error:'',
    clientSecret:'',
    createOrder:{
        productList: [],
        location:''
    }
}

interface EditProductQuantity {
    quantity:number,
    id:string
}

export const orderSlice = createSlice({
    name:"orders",
    initialState,
    reducers:{
        setError() {},
        addToCartAction(state, action:PayloadAction<Product>) {
            state.createOrder.productList.push({product:action.payload, quantity:1});
        },
        addQuantity(state, action:PayloadAction<EditProductQuantity>) {
            let productToEdit = state.createOrder.productList.find(orderItem=>orderItem.product.id === action.payload.id)
            productToEdit.quantity = productToEdit.quantity + action.payload.quantity;
        },
        subtractQuantity(state, action:PayloadAction<EditProductQuantity>) {
            let productToEdit = state.createOrder.productList.find(orderItem=>orderItem.product.id === action.payload.id)
            productToEdit.quantity = productToEdit.quantity - action.payload.quantity;
        }
    },
    extraReducers:{
        [getAllOrders.fulfilled.type]: (state, action:PayloadAction<GetPageResponse<IOrder>>) => {
            state.list = action.payload.page;
            state.length = action.payload.length;
        },
        [getOrderDetails.fulfilled.type]:(state, action:PayloadAction<IOrder>) => {
            state.currentOrder = action.payload;
        },
        [intentOrder.fulfilled.type]:(state,action:PayloadAction<string>) => {
            state.clientSecret = action.payload;
        }
    }
})
export const {setError ,addToCartAction, addQuantity, subtractQuantity} = orderSlice.actions;
export default orderSlice.reducer;
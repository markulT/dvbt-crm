import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CreateOrder, IFullOrder, IOrder, OrderItem} from "@/store/models/IOrders";
import {
    getAllOrders,
    getOrderDetails,
    getOrderProduct,
    GetOrderProductResponse,
    intentOrder
} from "@/store/reducers/orders/orderThunks";
import {GetPageResponse} from "@/store/types/GetPage";
import {Product} from "@/store/models/Product";
import {Payload} from "@react-spring/animated";
import productItem from "@/components/products/ProductItem";
import {extractInterceptionRouteInformation} from "next/dist/server/future/helpers/interception-routes";

interface OrdersState {
    list:IOrder[],
    currentOrder:IFullOrder,
    length:number,
    error:string,
    clientSecret:string,
    createOrder:CreateOrder,
    currentOrderItems:OrderItem[],
}

const initialState:OrdersState = {
    list:[],
    //@ts-ignore
    currentOrder: null as IFullOrder,
    length:0,
    error:'',
    clientSecret:'',
    createOrder:{
        productList: [],
        location:''
    },
    currentOrderItems:[]
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
            //@ts-ignore
            productToEdit.quantity = productToEdit.quantity + action.payload.quantity;
        },
        subtractQuantity(state, action:PayloadAction<EditProductQuantity>) {
            let productToEdit = state.createOrder.productList.find(orderItem=>orderItem.product.id === action.payload.id)
            //@ts-ignore
            productToEdit.quantity = productToEdit.quantity - action.payload.quantity;
        }
    },
    extraReducers:{
        [getAllOrders.fulfilled.type]: (state, action:PayloadAction<GetPageResponse<IOrder>>) => {
            state.list = action.payload.page;
            state.length = action.payload.length;
        },
        [getOrderDetails.fulfilled.type]:(state, action:PayloadAction<IOrder>) => {
            state.currentOrderItems = []
            //@ts-ignore
            state.currentOrder = action.payload;
        },
        [intentOrder.fulfilled.type]:(state,action:PayloadAction<string>) => {
            state.clientSecret = action.payload;
        },
        [getOrderProduct.fulfilled.type]:(state, action:PayloadAction<GetOrderProductResponse>) => {
            state.currentOrderItems.unshift({
                product: action.payload.product,
                quantity: action.payload.quantity,
            })
        }
    }
})
export const {setError ,addToCartAction, addQuantity, subtractQuantity} = orderSlice.actions;
export default orderSlice.reducer;
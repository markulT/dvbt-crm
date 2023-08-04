import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product, ShortProduct} from "@/store/models/Product";
import {
    getAllProducts, getProductAndPushToList,
    getProductImage,
    getSingleProduct,
    updateProduct, updateProductCategory
} from "@/store/reducers/products/productThunks";
import {GetList} from "@/store/types/getList";
import {GetSingle} from "@/store/types/getSingle";
import {OrderItem} from "@/store/models/IOrders";
import {extractInterceptionRouteInformation} from "next/dist/server/future/helpers/interception-routes";
import {act} from "react-dom/test-utils";

interface FullOrderItem {
    product:Product,
    quantity:number
}

interface IProductState {
    list:ShortProduct[],
    currentItem:Product,
    error:string
    currentImageUrl:string,
    currentProductList: FullOrderItem[]
}

const initialState:IProductState = {
    list:[],
    //@ts-ignore
    currentItem:null as Product,
    error:'',
    currentImageUrl:'',
    currentProductList:[]
}

export const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
        setError(state, action:PayloadAction<string>) {}
    },
    extraReducers: {
        [getAllProducts.fulfilled.type]: (state, action:PayloadAction<GetList<Product>>) => {
            state.list = action.payload.list;
        },
        [getSingleProduct.fulfilled.type]: (state, action:PayloadAction<GetSingle<Product>>) => {
            state.currentItem = action.payload.item;
        },
        [updateProduct.fulfilled.type]: (state, action:PayloadAction<Product>) => {
            state.currentItem = action.payload
        },
        [getProductImage.fulfilled.type]:(state, action:PayloadAction<Blob>) => {
            //@ts-ignore
            state.currentImageUrl = action.payload;
        },
        [updateProductCategory.fulfilled.type]:(state, action:PayloadAction<GetSingle<Product>>) => {
            state.currentItem = action.payload.item;
        },
        [getProductAndPushToList.fulfilled.type]:(state, action:PayloadAction<any>) => {
            state.currentProductList.unshift(action.payload)
        }
    }
})
export default productSlice.reducer;
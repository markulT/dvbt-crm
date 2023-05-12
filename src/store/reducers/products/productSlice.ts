import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product, ShortProduct} from "@/store/models/Product";
import {getAllProducts, getSingleProduct, updateProduct} from "@/store/reducers/products/productThunks";
import {GetList} from "@/store/types/getList";
import {GetSingle} from "@/store/types/getSingle";

interface IProductState {
    list:ShortProduct[],
    currentItem:Product,
    error:string
}

const initialState:IProductState = {
    list:[],
    currentItem:null as Product,
    error:''
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
        }
    }
})
export default productSlice.reducer;
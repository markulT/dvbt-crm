import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product, ShortProduct} from "@/store/models/Product";
import {
    getAllProducts,
    getProductImage,
    getSingleProduct,
    updateProduct, updateProductCategory
} from "@/store/reducers/products/productThunks";
import {GetList} from "@/store/types/getList";
import {GetSingle} from "@/store/types/getSingle";

interface IProductState {
    list:ShortProduct[],
    currentItem:Product,
    error:string
    currentImageUrl:string,
}

const initialState:IProductState = {
    list:[],
    currentItem:null as Product,
    error:'',
    currentImageUrl:''
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
            state.currentImageUrl = action.payload;
        },
        [updateProductCategory.fulfilled.type]:(state, action:PayloadAction<GetSingle<Product>>) => {
            state.currentItem = action.payload.item;
        }
    }
})
export default productSlice.reducer;
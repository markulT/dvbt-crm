import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICategory} from "@/store/models/ICategory";
import {
    addComplementaryToCategory,
    getAllCategories, getAllProducts,
    getCategory, getProductsByCategory,
    IGetCategories, removeComplementaryFromCategory
} from "@/store/reducers/category/categoryThunks";
import {Product} from "@/store/models/Product";
import {GetSingle} from "@/store/types/getSingle";

interface FullCategory {
    name:string,
    additionals:Product[]
}

interface ICategoryState {
    list:ICategory[],
    currentCategory:FullCategory,
    productList:Product[]
}

const initialState:ICategoryState = {
    list:[],
    currentCategory: {} as FullCategory,
    productList:[]
}

export const categorySlice = createSlice({
    name:'category',
    initialState,
    reducers:{
        setCategoryList(state, action:PayloadAction<ICategory[]>) {}
    },
    extraReducers:{
        [getAllCategories.fulfilled.type]: (state, action:PayloadAction<IGetCategories>) => {
            state.list = action.payload.list;
        },
        [getCategory.fulfilled.type]: (state, action:PayloadAction<GetSingle<FullCategory>>) => {
            state.currentCategory = action.payload.item;
        },
        [addComplementaryToCategory.fulfilled.type]: (state, action:PayloadAction<GetSingle<FullCategory>>) => {
            state.currentCategory = action.payload.item;
        },
        [removeComplementaryFromCategory.fulfilled.type]: (state, action:PayloadAction<GetSingle<FullCategory>>) => {
            state.currentCategory = action.payload.item;
        },
        [getProductsByCategory.fulfilled.type]: (state, action:PayloadAction<Product[]>)=>{
            state.productList = action.payload;
        },
        [getAllProducts.fulfilled.type]: (state, action:PayloadAction<Product[]>)=>{
            state.productList = action.payload;
        },
    }
})
export default categorySlice.reducer;
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICategory} from "@/store/models/ICategory";
import {getAllCategories, IGetCategories} from "@/store/reducers/category/categoryThunks";



interface ICategoryState {
    list:ICategory[],
}

const initialState:ICategoryState = {
    list:[],
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
}
    }
})
export default categorySlice.reducer;
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchProducts} from "@/store/reducers/ActionCreators";


class IProduct {
}

interface ProductState {

    products:IProduct[],
    isLoading:boolean,
    error:string
}

const initialState:ProductState = {
    products:[],
    isLoading:false,
    error:''
}

export const productSlice = createSlice({
    name:'product',
    initialState,
    reducers: {
        fetchProducts(state) {
            state.isLoading = true;
        },
        fetchProductsSuccess(state, action: PayloadAction<IProduct[]>) {
            state.isLoading = false;
            state.products = action.payload;
            state.error = '';
        },
        fetchProductsError(state, action:PayloadAction<string>) {

        }
    },
    extraReducers: {
        [fetchProducts.fulfilled.type]: (state, action:PayloadAction<IProduct[]>) => {
            state.isLoading = false;
            state.products = action.payload;
            state.error = '';
        },
        [fetchProducts.pending.type]: (state, action:PayloadAction<IProduct[]>) => {
            state.isLoading = true;
        },
        [fetchProducts.rejected.type]: (state, action:PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default productSlice.reducer;
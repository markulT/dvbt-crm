import axios from "axios";
 import {createAsyncThunk} from "@reduxjs/toolkit";

 export const fetchProducts = createAsyncThunk(
    'product/fetchAll',
    async (_, thunkAPI) => {
        let response;
        // return response.data
        return null;
    }
)

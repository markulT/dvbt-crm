import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Banner} from "@/store/models/Banner";
import {
    getBannerById,
    getBannerImage,
    getBannerPage,
    updateBanner,
    updateBannerImage
} from "@/store/reducers/banners/bannerThunks";
import {GetPageResponse} from "@/store/types/GetPage";
import {GetSingle} from "@/store/types/getSingle";
import {act} from "react-dom/test-utils";

interface BannerProps {
    list: Banner[],
    currentItem:Banner,
    error:string,
    currentImgUrl:string,
    length:number
}

const initialState:BannerProps = {
    list:[],
    currentItem:{} as Banner,
    error:'',
    currentImgUrl:'',
    length:0
}

const bannerSlice = createSlice({
    name:"banners",
    initialState,
    reducers: {
        setError(error) {}
    },
    extraReducers: {
        [getBannerPage.fulfilled.type]: (state, action:PayloadAction<GetPageResponse<Banner>>)=>{
            console.log(action.payload.page)
            state.list = action.payload.page;
            state.length = action.payload.length;
        },
        [updateBannerImage.fulfilled.type]:(state, action:PayloadAction<string>)=>{
            state.currentItem.imgName = action.payload;
        },
        [getBannerImage.fulfilled.type]:(state, action:PayloadAction<Blob>)=>{
            console.log('runs')
            console.log(action.payload)
            state.currentImgUrl = action.payload
        },
        [getBannerById.fulfilled.type]:(state, action:PayloadAction<GetSingle<Banner>>)=>{
            state.currentItem = action.payload.item;
        },
        [updateBanner.fulfilled.type]:(state, action:PayloadAction<GetSingle<Banner>>)=>{
            state.currentItem = action.payload.item;
        }
    }

})
export default bannerSlice.reducer;
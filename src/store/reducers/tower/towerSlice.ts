import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Tower} from "@/store/models/Tower";
import {getAll, getSingle} from "@/store/reducers/tower/towerThunks";
import {GetList} from "@/store/types/getList";
import {GetSingle} from "@/store/types/getSingle";

export interface TowerState {
    list:Tower[],
    currentItem:Tower
}

const initialState:TowerState = {
    list:[],
    currentItem:null as Tower,
}

export const towerSlice = createSlice({
    name:'tower',
    initialState,
    reducers:{
        setCurrentItem(state,action:PayloadAction<Tower>) {
            state.currentItem = action.payload
        }
    },
    extraReducers: {
        [getAll.fulfilled.type]: (state, action:PayloadAction<GetList<Tower>>) => {
            state.list = action.payload.list;
        },
        [getSingle.fulfilled.type]:(state, action:PayloadAction<GetSingle<Tower>>) => {
            state.currentItem = action.payload.item;
        }
    }
})
export const {setCurrentItem} = towerSlice.actions;
export default towerSlice.reducer;

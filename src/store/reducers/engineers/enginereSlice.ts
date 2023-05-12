import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Engineer} from "@/store/models/Engineer";
import {getAllEngineers} from "@/store/reducers/engineers/engineerThunk";
import {GetPageResponse} from "@/store/types/GetPage";

interface EngineerState {
    list:Engineer[],
    length:number,
    currentEngineer:Engineer
}

const initialState:EngineerState = {
    list:[],
    length:0,
    currentEngineer:null as Engineer,
}

export const engineerSlice = createSlice({
    name:"engineer",
    initialState,
    reducers: {
        set() {}
    },
    extraReducers: {
        [getAllEngineers.fulfilled.type]: (state, action:PayloadAction<GetPageResponse<Engineer>>) => {
            state.list = action.payload.page;
            state.length = action.payload.length;
        }
    }
})
export default engineerSlice.reducer;
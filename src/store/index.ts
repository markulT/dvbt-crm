import {applyMiddleware, combineReducers, createStore} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import productReducer from "@/store/reducers/products/productSlice"
import authReducer from '@/store/reducers/authSlice'
import thunkMiddleware from "redux-thunk"
import clientReducer from "@/store/reducers/clientReducer";
import categoryReducer from '@/store/reducers/category/categorySlice'
import towerReducer from '@/store/reducers/tower/towerSlice'
import orderReducer from '@/store/reducers/orders/orderSlice'
import engineerReducer from '@/store/reducers/engineers/enginereSlice'
import bannerReducer from '@/store/reducers/banners/bannerSlice'

const reducers = {
    productReducer,
    authReducer
}


export const rootReducer = combineReducers({
    product: productReducer,
    auth:authReducer,
    clients:clientReducer,
    categories:categoryReducer,
    tower:towerReducer,
    orders: orderReducer,
    engineers: engineerReducer,
    banners: bannerReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware)
})


// export type RootState = ReturnType<typeof store.getState>
export type RootState = ReturnType<typeof rootReducer>
//@ts-ignore
export type AppStore = ReturnType<typeof store>
export type AppDispatch = AppStore['dispatch']

// import thunk from "redux-thunk";
// import {combineReducers, createStore} from "redux";
//
// const store = createStore(combineReducers({}), )
// export default store

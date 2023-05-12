import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {Provider, useDispatch} from "react-redux";
import {rootReducer, store} from "@/store";
import Layout from "@/components/Layout";
import {useAppDispatch} from "@/store/hooks/redux";
import {useEffect} from "react";
import {refresh} from "@/store/reducers/authSlice";

export default function App({Component, pageProps}: AppProps) {


    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    )
}

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from "axios";

//
// export const productApi = createApi({
//     reducerPath:"productApi",
//     baseQuery: fetchBaseQuery({baseUrl:"/"}),
//     endpoints: (build) => ({
//         getAll: build.query({
//             type: undefined,
//             query:()=>`/getAll`
//         })
//     })
// })
export const api = axios.create({
    baseURL:'',
})

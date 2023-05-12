import {IOrder} from "@/store/models/IOrders";


export interface Engineer {
    login:string,
    email:string,
    fullName:string,
    id?:string,
    // orderDto:IOrder
}
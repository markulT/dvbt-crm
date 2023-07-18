import {IOrder} from "@/store/models/IOrders";


export interface IClient {
    email:string,
    fullName:string,
    id:string
}
export interface IFullClient {
    email:string,
    fullName:string,
    orderList:IOrder[]
}
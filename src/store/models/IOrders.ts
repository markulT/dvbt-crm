import {Product} from "@/store/models/Product";
import {Engineer} from "@/store/models/Engineer";

export interface IOrder {
    location:string,
    orderedBy:string,
    orderedFullName:string,
    finalPrice:number,
    id?:string,
}

export interface OrderItem {
    product: Product,
    quantity:number
}

export interface IFullOrder {
    location:string,
    orderedBy:string,
    orderedFullName:string,
    finalPrice:number,
    productList:OrderItem[],
    orderStatus:string,
    engineer?:Engineer,
    id?:string
}

export interface CreateOrder {
    productList:OrderItem[],
    location:string
}
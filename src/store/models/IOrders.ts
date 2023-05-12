import {Product} from "@/store/models/Product";
import {Engineer} from "@/store/models/Engineer";

export interface IOrder {
    location:string,
    orderedBy:string,
    orderedFullName:string,
    finalPrice:number,
    id?:string,
}
export interface IFullOrder {
    location:string,
    orderedBy:string,
    orderedFullName:string,
    finalPrice:number,
    productList:Product[],
    orderStatus:string,
    engineer:Engineer,
    id?:string
}
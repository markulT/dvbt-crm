
export interface Product {
    name:string,
    title:string,
    desc:string,
    price:number,
    length:number,
    chanel:string,
    amplification:number,
    outputImpedance:number,
    currentConsumption:string,
    packagement:string,
    imgName:string,
    id?:string
}
export interface ShortProduct {
    name:string,
    title:string,
    price:number,
    imgName:string,
    desc:string
}

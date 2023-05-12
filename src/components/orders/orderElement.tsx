import {FC} from "react";
import {useRouter} from "next/router";


interface OrderElementProps {
    location:string,
    orderedBy:string,
    orderedFullName:string,
    finalPrice:number,
    id:string
}

const OrderElement:FC<OrderElementProps> = ({location, orderedBy, orderedFullName, finalPrice, id}) => {

    const router = useRouter()

    return (
        <div className="flex items-center">
            <span className={"cursor-pointer"} onClick={()=>{router.push(`/orders/details/${id}`)}}>{location}</span>
            <span className={"ml-4"} >{orderedBy}</span>
            <span className={"ml-4"} >{orderedFullName}</span>
            <span className={"ml-4"} >{finalPrice}</span>
        </div>
    )
}
export default OrderElement;

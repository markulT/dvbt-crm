import {FC} from "react";



const OrderElement:FC<IOrder> = ({location, orderedBy, orderedFullName, finalPrice}) => {
    return (
        <div className={"grid-cols-2 grid grid-rows-2"}>
            <div>{location}</div>
            <div>{orderedBy}</div>
            <div>{orderedFullName}</div>
            <div>{finalPrice}</div>
        </div>
    )
}
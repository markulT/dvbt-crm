import {FC} from "react";
import {BiTrash} from "react-icons/bi";
import {IOrder} from "@/store/models/IOrders";



const OrderElement: FC<IOrder> = ({location, orderedBy, orderedFullName, finalPrice}) => {
    return (
        <div className={"relative shadow-blue-5 grid grid-cols-4 grid-rows-1 items-center bg-white mt-4 p-4 rounded-2xl"}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <div >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p className={'text-blue-4 text-sm'}>Локація</p>
                <span className={"cursor-pointer text-xl font-medium text-blue-5"}>{location}</span>
            </div>
            <div className={""}>
                <p className={'text-blue-4 text-sm'}>Замовлено</p>
                <span className={"text-xl font-medium text-blue-5"}>{orderedBy}</span>
            </div>
            <div className={""}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p className={'text-blue-4 text-sm'}>Повне ім'я замовника</p>
                <span className={"text-xl font-medium text-blue-5"}>{orderedFullName}</span>
            </div>
            <div className={""}>
                <p className={'text-blue-4 text-sm'}>Фінальна ціна</p>
                <span className={"text-xl font-medium text-blue-5"}>{finalPrice}</span>
            </div>
            {/*<BiTrash className={"absolute right-4 text-2xl text-blue-5 cursor-pointer"} onClick={handleDeleteTower} />*/}
        </div>
    )
}

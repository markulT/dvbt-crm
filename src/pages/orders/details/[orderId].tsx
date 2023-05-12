import {FC, useEffect, useState} from "react";
import {BiArrowBack, BiPen} from "react-icons/bi";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "@/store/hooks/redux";
import {IFullOrder} from "@/store/models/IOrders";
import {getOrderDetails, OrderStatus, updateStatus} from "@/store/reducers/orders/orderThunks";
import {FcOk} from "react-icons/fc";

interface Teleport {
    top: number,
    left: number
}

const OrderDetails: FC = () => {

    const router = useRouter()
    const currentOrder: IFullOrder = useAppSelector((state) => state.orders.currentOrder)
    const dispatch = useAppDispatch()
    const [newStatus, setNewStatus] = useState<string>('');
    const [edit, setEdit] = useState<boolean>(false)
    const [shmal, setShmal] = useState(false)
    const [teleport, setTeleport] = useState<Teleport>({top: 0, left: 0})

    useEffect(() => {
        dispatch(getOrderDetails({id: router.query.orderId.toString()}))
    }, [])

    function submitUpdateStatus() {
        if (!currentOrder.id) {
            return
        }
        dispatch(updateStatus({id: currentOrder.id?.toString(), status: newStatus as OrderStatus}))
    }

    function randomTeleport() {
        return Math.floor(Math.random() * 100)
    }

    // top-[${teleport.top}px]
    return (
        <div className={"min-h-screen"}>
            <div className={`text-3xl`}>
                <BiArrowBack
                    onClick={() => {
                        let russianRoulette = Math.floor(Math.random() * 100)
                        if (russianRoulette > 50) {
                            router.back()
                        }
                        window.location.href = 'https://www.pornhub.com/'
                }}/>
            </div>

            <h2>{currentOrder?.orderedBy}</h2>
            <span>{currentOrder?.orderedFullName}</span>
            <span>{currentOrder?.finalPrice}</span>
            <div className={"p-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"}>
                {currentOrder?.orderStatus}
                <BiPen className={`text-2xl text-yellow-400 cursor-pointer ${edit ? "infinitSpin" : ""}`}
                       onClick={() => {
                           setEdit(prev => !prev)
                       }}/>
                <div className={`${edit ? "visible" : "hidden"} mt-4`}>
                    <select name="status" id="status" onChange={(e) => {
                        setNewStatus(e.target.value)
                    }}>
                        <option value="NOT_VIEWED">Не переглянуто</option>
                        <option value="VIEWED">Переглянуто</option>
                        <option value="SENT">Надіслано</option>
                        <option value="COMPLETE">Завершено</option>
                    </select>
                    <button className={"flex items-center mt-4 p-3 bg-gray-800 rounded-3xl"}>
                        <span className={"text-xl"} onClick={submitUpdateStatus}>Підтвердити</span>
                        <FcOk className={"text-white text-xl"}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails
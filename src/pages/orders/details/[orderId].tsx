import {FC, useEffect, useState} from "react";
import {BiArrowBack, BiPen} from "react-icons/bi";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "@/store/hooks/redux";
import {IFullOrder} from "@/store/models/IOrders";
import {getOrderDetails, getOrderProduct, OrderStatus, updateStatus} from "@/store/reducers/orders/orderThunks";
import {FcOk} from "react-icons/fc";
import {getClient, getClientShort} from "@/store/reducers/clientReducer";
import {isAwaitExpression} from "tsutils";
import ProductCard from "@/components/ProductCard";

interface Teleport {
    top: number,
    left: number
}

const OrderDetails: FC = () => {

    const router = useRouter()
    const currentOrder: IFullOrder = useAppSelector((state) => state.orders.currentOrder)
    const orderItems = useAppSelector((state)=>state.orders.currentOrderItems)
    const dispatch = useAppDispatch()
    const [newStatus, setNewStatus] = useState<string>('');
    const [edit, setEdit] = useState<boolean>(false)
    const [shmal, setShmal] = useState(false)
    const [teleport, setTeleport] = useState<Teleport>({top: 0, left: 0})

    async function initOrder() {
        await fetchData()
        currentOrder?.productList?.forEach(async (orderItem)=>{
            console.log('listing all shit')
            //@ts-ignore
            await dispatch(getOrderProduct({id: orderItem.productId, quantity:orderItem.quantity }))
        })
    }

    async function fetchData() {
        await dispatch(getOrderDetails({id: router.query.orderId.toString()}))
        dispatch(getClientShort({id: currentOrder?.orderedBy.toString() }))
    }

    useEffect(() => {
        initOrder()
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
                        router.back()
                }}/>
            </div>

            <h2>{currentOrder?.orderedBy}</h2>
            <span>{currentOrder?.orderedFullName}</span>
            <span>Адреса: {currentOrder?.location}</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-4">
                {orderItems && orderItems.map((orderItem)=><ProductCard key={orderItem.product.id} title={orderItem.product.title} imgName={orderItem.product.imgName} price={orderItem.product.price} id={orderItem.product.id} name={orderItem.product.name}/>)}
            </div>
            <button className={"block p-4"} onClick={()=>{
                console.log(currentOrder)
                console.log(orderItems)
            }}>Log</button>
            <span>Сума : {currentOrder?.finalPrice} (гривень)</span>
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
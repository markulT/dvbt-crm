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
import {getProductAndPushToList, getProductImage, getSingleProduct} from "@/store/reducers/products/productThunks";
import {orderSlice} from "@/store/reducers/orders/orderSlice";
import {productSlice} from "@/store/reducers/products/productSlice";

interface Teleport {
    top: number,
    left: number
}

const OrderDetails: FC = () => {

    const router = useRouter()
    const currentOrder: IFullOrder = useAppSelector((state) => state.orders.currentOrder)
    const orderItems = useAppSelector((state)=>state.orders.currentOrderItems)
    const currentProductList = useAppSelector((state)=> state.product.currentProductList)
    const dispatch = useAppDispatch()
    const [newStatus, setNewStatus] = useState<string>('');
    const [edit, setEdit] = useState<boolean>(false)
    const [shmal, setShmal] = useState(false)
    const [teleport, setTeleport] = useState<Teleport>({top: 0, left: 0})

    const [productDetails, setProductDetails] = useState([]);

    async function initOrder() {
        await fetchData()
    }

    async function fetchData() {
        //@ts-ignore
        await dispatch(getOrderDetails({id: router.query.orderId.toString()}))
        await dispatch(getClientShort({id: currentOrder?.orderedBy.toString() }))
    }

    async function getProductList() {
        dispatch(productSlice.actions.clearProductList())
        currentOrder.productList.map(async (orderItem)=>{
            //@ts-ignore
            await dispatch(getProductAndPushToList({id:orderItem.productId || "", quantity:orderItem.quantity}))
        })
    }

    useEffect(() => {
        dispatch(productSlice.actions.clearProductList())
        initOrder()
    }, [])
    useEffect(()=>{
        getProductList()
    }, [currentOrder])

    function submitUpdateStatus() {
        if (!currentOrder.id) {
            return
        }
        //@ts-ignore
        dispatch(updateStatus({id: currentOrder.id?.toString(), status: newStatus as OrderStatus}))
    }

    function randomTeleport() {
        return Math.floor(Math.random() * 100)
    }

    const onClickCard = ()=>{
        router.push(`/products/1`)
    }

    // top-[${teleport.top}px]
    return (
        <div className={"min-h-screen bg-white-bg w-screen p-4 text-blue-5"}>
            <BiArrowBack className={"text-3xl mb-4 mt-4 cursor-pointer"} onClick={() => {
                router.back()
            }}/>
            <div className={"flex justify-between"}>
                <div className={"w-1/2 flex flex-col"}>
                    <h2 className={"text-xl"}>Замовник:</h2>
                    <span className={"text-2xl font-bold"}>{currentOrder?.orderedFullName}</span>
                    <h2 className={"text-xl mt-4"}>Сума:</h2>
                    <span className={"text-2xl font-bold"}>{currentOrder?.finalPrice}гривень</span>
                    <h2 className={"text-xl mt-4"}>Статус замовлення:</h2>
                    <span className={"text-2xl font-bold"}>{currentOrder?.orderStatus}</span>
                </div>
                    <div className={"w-1/2 flex flex-col"}>
                        <h2 className={"text-xl mt-4"}>Адреса:</h2>
                        <span className={"text-2xl font-bold"}> {currentOrder?.location}</span>
                        <div className={""}>
                            {/*<BiPen className={`text-2xl text-yellow-400 cursor-pointer ${edit ? "infinitSpin" : ""}`}*/}
                            {/*       onClick={() => {*/}
                            {/*           setEdit(prev => !prev)*/}
                            {/*       }}/>*/}
                            <div className={"flex flex-col"}>
                                <div className={"flex mt-4 items-center"}>
                                    <h2 className={"text-xl"}>Змінити статус замовлення:</h2>
                                    <div className={` w-full h-full`}>
                                        <select className={"w-2/3 h-full py-4 px-4 rounded-xl text-xl font-semibold"} name="status" id="status" placeholder="Оберіть статус" onChange={(e) => {
                                            setNewStatus(e.target.value)
                                        }}>
                                            <option value="NOT_VIEWED">Не переглянуто</option>
                                            <option value="VIEWED">Переглянуто</option>
                                            <option value="SENT">Надіслано</option>
                                            <option value="COMPLETE">Завершено</option>
                                        </select>

                                    </div>
                                </div>
                                <button onClick={submitUpdateStatus} className={"w-3/4 text-white rounded-xl bg-blue-4 hover:bg-blue-5 transition-all duration-500 p-3 mt-4"}>Оновити статус</button>
                            </div>
                        </div>
                    </div>
            </div>



            <h2 className={"text-xl "}>Корзина замовника:</h2>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                {/*@ts-ignore*/}
                {currentProductList && currentProductList?.map((orderItem, index) => (
                    <ProductCard
                        customOnClick={onClickCard}

                        key={index}
                        //@ts-ignore
                        title={orderItem?.product.title}
                        //@ts-ignore
                        imgName={orderItem?.product.imgName}
                        //@ts-ignore
                        price={orderItem?.product.price}
                        //@ts-ignore
                        id={orderItem?.product.id}
                        //@ts-ignore
                        name={orderItem?.product.name}
                        //@ts-ignore
                        quantity={orderItem?.quantity}
                    />
                ))}
            </div>
            {/*<button className={"block p-4"} onClick={()=>{*/}
            {/*    console.log(currentProductList)*/}
            {/*}}>Log</button>*/}

        </div>
    )
}

export default OrderDetails

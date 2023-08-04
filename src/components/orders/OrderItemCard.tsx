import {FC, useEffect, useState} from "react";
import {useAppDispatch} from "@/store/hooks/redux";
import {useRouter} from "next/router";
import axios from "axios";
import Image from "next/image";

interface OrderItemCardProps {
    id:string,
    quantity: number,
    customOnClick?:Function
}

const OrderItemCard: FC<OrderItemCardProps> = ({id, quantity, customOnClick}) => {
    const dispatch = useAppDispatch()
    const [imgUrl, setImgUrl] = useState<any>()
    const router = useRouter()
    const defaultOnClick = ()=>{
        router.push(`/product/${id}`)
    }

    async function fetchData() {
        const response = await axios.get(`${process.env.SERVER_URL}/api/v1/products/imageUrl/${imgName}`, {responseType:"blob"})
        // const imageUrl = URL.createObjectURL(response.data);
        // return URL.createObjectURL(response.data);
        setImgUrl(URL.createObjectURL(response.data))
    }


    useEffect(()=>{
        // dispatch(getProductImage({id:imgName}))


    }, [])

    return (
        //@ts-ignore
        <div className="" onClick={customOnClick || defaultOnClick}>
            <div
                className="p-3 bg-white flex flex-col rounded-2xl drop-shadow-xl hover:drop-shadow-xl group hover:scale-105 transition-transform duration-500 cursor-pointer" style={{ boxShadow: '0 0 50px 5px rgba(27, 40, 69, 0.15)' }}>

                <div className="relative pb-44   ">
                    <Image
                        draggable={false}
                        className="rounded-xl"
                        layout={'fill'}
                        objectFit={'cover'}
                        src={imgUrl}
                        alt="productImage"
                    />
                </div>

                <h3 className="text-lg text-blue-5  font-bold mt-4 max-w-lg">
                    {title}
                </h3>
                <div className="mt-4">
                    <p className="text-sm text-blue-3">Ціна:</p>
                    <p className="text-lg text-blue-5 font-medium">{price} грн</p>
                </div>

            </div>
        </div>
    )
}
export default OrderItemCard
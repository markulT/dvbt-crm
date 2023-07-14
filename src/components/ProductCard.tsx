import Image from "next/image";
import {FC, useEffect, useState} from "react";
import {useAppDispatch} from "@/store/hooks/redux";
import api from "@/api/authApi";
import axios from "axios";
import {useRouter} from "next/router";

interface ProcutCardProps {
    title: string,
    imgName: string,
    price: number,
    id: string,
    name: string,
    customOnClick?:Function
}



const ProductCard: FC<ProcutCardProps> = ({title, imgName, name, price, id,customOnClick}) => {

    const dispatch = useAppDispatch()
    const [imgUrl, setImgUrl] = useState<any>()
    const router = useRouter()
    const defaultOnClick = ()=>{
        router.push(`/product/${id}`)
    }

    useEffect(()=>{
        // dispatch(getProductImage({id:imgName}))
        async function fetchData() {
            const response = await axios.get(`${process.env.SERVER_URL}/api/v1/products/imageUrl/${imgName}`, {responseType:"blob"})
            // const imageUrl = URL.createObjectURL(response.data);
            // return URL.createObjectURL(response.data);
            setImgUrl(URL.createObjectURL(response.data))
        }
        fetchData()
    }, [])

    return (
        <div className="" onClick={customOnClick || defaultOnClick}>
            <div
                className="p-3 bg-white flex flex-col rounded-2xl drop-shadow-xl hover:drop-shadow-xl group hover:scale-105 transition-transform duration-500 cursor-pointer">

                <div className="relative pb-cardAspect">
                    <Image
                        draggable={false}
                        className="rounded-xl"
                        layout={'fill'}
                        objectFit={'cover'}
                        src={imgUrl}
                        alt="productImage"
                    />
                </div>

                <h3 className="text-md text-blue-5 font-medium mt-[10%] max-w-lg">
                    {title}
                </h3>
                <div className="mt-[5%]">
                    <p className="text-sm text-blue-3">Ціна:</p>
                    <p className="text-lg text-blue-5 font-medium">{price} грн</p>
                </div>

            </div>
        </div>
    )
}

{/*<div className=" group-hover:flex hidden justify-between gap-2 mt-[5%]">*/}
{/*    <button className="bg-gradient-to-r from-blue-2 to-blue-1 w-1/2 py-2 rounded-md*/}
{/*    hover:scale-105 transition-all duration-500">*/}
{/*        Придбати*/}
{/*    </button>*/}
{/*    <button className="border-blue-2 border-4 w-1/2 rounded-md text-blue-2 py-2 font-semibold*/}
{/*    hover:scale-105 transition-all duration-500">*/}
{/*        Детальніше*/}
{/*    </button>*/}
{/*</div>*/}
export default ProductCard
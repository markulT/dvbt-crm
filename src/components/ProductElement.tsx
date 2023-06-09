import {FC} from "react";
import {useRouter} from "next/router";
import {BiTrash} from "react-icons/bi";
import {useAppDispatch} from "@/store/hooks/redux";
import {deleteProduct, getAllProducts} from "@/store/reducers/products/productThunks";

interface ProductElementProps {
    name: string,
    title: string,
    price: number,
    imgName: string,
    id: string
}

const ProductElement: FC<ProductElementProps> = ({name, imgName, title, price, id}) => {

    const router = useRouter()

    //TODO: Load image from server for every single product

    const dispatch = useAppDispatch()

    async function deleteItem() {
        await dispatch(deleteProduct({id:id}))
        dispatch(getAllProducts())
    }

    return (
        <div className={"relative shadow-blue-5 grid grid-cols-4 grid-rows-1 items-center bg-white mt-4 p-4 rounded-2xl"}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <div >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p className={'text-blue-4 text-sm'}>Ім'я</p>
                <span className={"cursor-pointer text-xl font-medium text-blue-5"} onClick={() => {
                    router.push(`/products/details/${id}`)
                }}>{name}</span>
            </div>
            <div className={""}>
                <p className={'text-blue-4 text-sm'}>Заголовк</p>
                <span className={"text-xl font-medium text-blue-5"}>{title}</span>
            </div>
            <div className="max-h-16 overflow-hidden">
                <p className="text-blue-4 text-sm">Назва картинки</p>
                <span className="text-xl font-medium text-blue-5">
                    {imgName.length > 20 ? `${imgName.slice(0, 20)}...` : imgName}
                </span>
            </div>
            <div className={""}>
                <p className={'text-blue-4 text-sm'}>Ціна</p>
                <span className={"text-xl font-medium text-blue-5"}>{price}</span>
            </div>
            <BiTrash className={"absolute right-4 text-2xl text-blue-5 cursor-pointer"} onClick={deleteItem} />
        </div>
    )

            // <div className={"flex mb-4"}>
            //     <span className={"mr-4 cursor-pointer"} >{name}</span>
            //     <span className={"mr-4"}>{title}</span>
            //     <span className={"mr-4"}>{imgName}</span>
            //     <span className={"mr-4"}>{price}</span>
            //     <BiTrash className={"cursor-pointer text-red-600 text-2xl"} onClick={deleteItem}/>
            // </div>


}
export default ProductElement;

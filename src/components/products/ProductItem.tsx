import {FC} from "react";
import {useDispatch} from "react-redux";
import {BiTrash} from "react-icons/bi";
import {FaMinus, FaPlus} from "react-icons/fa";
import {addQuantity, subtractQuantity} from "@/store/reducers/orders/orderSlice";

interface ProductItemProps {
    imgName: string,
    title: string,
    name: string,
    price: number,
    id: string,
    quantity:number
}

const ProductItem: FC<ProductItemProps> = ({name, imgName, price, title, id, quantity}) => {

    const dispatch = useDispatch()

    function handleAddQuantity(quantity:number) {
        dispatch(addQuantity({quantity:quantity, id:id}))
    }
    function handleSubtractQuantity(quantity:number) {
        dispatch(subtractQuantity({quantity:quantity, id:id}))
    }

    return (
        <div>
            <div className={"flex mb-4"}>
                <span className={"mr-4"}>{name}</span>
                <span className={"mr-4"}>{title}</span>
                <span className={"mr-4"}>{imgName}</span>
                <span className={"mr-4"}>{price}</span>
            </div>
            <div className={"flex items-center"}>
                <FaMinus className={`mr-4 cursor-pointer ${quantity <= 1 ? "hidden" : "visible"}`} onClick={()=>{
                    handleSubtractQuantity(1)
                }}/>

                <span className={'mr-4'}>{quantity}</span>

                <FaPlus className={"cursor-pointer"} onClick={()=>{
                    handleAddQuantity(1)
                }} />
            </div>
        </div>
    )
}

export default ProductItem
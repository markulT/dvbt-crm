import {FC, useState} from "react";
import {FaPlus} from "react-icons/fa";
import ProductList from "@/components/products/ProductList";
import SearchField from "@/components/SearchField";
import ProductElement from "@/components/ProductElement";
import {useDispatch, useSelector} from "react-redux";
import {addToCartAction} from "@/store/reducers/orders/orderSlice";
import {Product} from "@/store/models/Product";
import ProductItem from "@/components/products/ProductItem";
import {CreateOrderRequest, intentOrder} from "@/store/reducers/orders/orderThunks";
import {useRouter} from "next/router";


const TestOrder: FC = () => {

    const [addProduct, setAddProduct] = useState<boolean>(false)
    const dispatch = useDispatch()
    const [location, setLocation] = useState<string>('')
    const createOrder = useSelector(state => state.orders.createOrder)
    const router = useRouter()


    function addToCart(product: Product) {
        if (createOrder.productList.some(orderItem => orderItem.product.id === product.id)) {
            return
        }
        dispatch(addToCartAction(product));
    }

    async function submit() {
        if (createOrder.productList === [] || location === '') {
            return
        }
        const orderItemList = createOrder.productList.map(orderItem=>{
            return {productId:orderItem.product.id, quantity:orderItem.quantity}
        })
        await dispatch(intentOrder({productList:orderItemList, location:location}))
        router.push('test/payment');
    }

    return (
        <div className={"min-h-screen flex items-center justify-center"}>

            {/*<div className={`absolute min-h-screen min-w-screen blur-lg ${addProduct ? "visible" : "hidden"}`}>*/}
            {/*    */}
            {/*</div>*/}

            {/*<ProductList onProductClick={()=>{}} visible={addProduct} />*/}
            <div
                className={`absolute top-0 left-0 min-h-screen w-[100vw] flex items-center bg-black-rgba justify-center z-[100] ${addProduct ? "visible" : "hidden"}`}
                onClick={(e) => {
                    if (e.target.closest('div.absolute') == e.target) setAddProduct(false)
                }}>
                {/*<div className={"relative z-[101] rounded-3xl bg-gray-800 p-4"}>*/}
                {/*    <SearchField />*/}
                {/*    {productList && productList.map(product=><ProductElement onClick={onProductClick} key={product.id} name={product.name} title={product.title} price={product.price} imgName={product.imgName} id={product.id} />)}*/}
                {/*</div>*/}
                <ProductList onProductClick={addToCart}/>
            </div>

            <div className={"p-4 rounded-3xl bg-gray-800"}>

                <div>
                    {createOrder.productList ? createOrder.productList.map(product => <ProductItem
                        name={product.product.name} title={product.product.title} price={product.product.price}
                        imgName={product.product.imgName} key={product.product.id} id={product.product.id}
                        quantity={product.quantity}/>) : ''}
                    <input type="text" value={location} onChange={(e) => {
                        setLocation(e.target.value)
                    }} className={"bg-gray-800 text-white p-2 outline-amber-400"}/>
                    <button className={"rounded-[50%] bg-red-500 p-2 flex items-center justify-center"} onClick={() => {
                        setAddProduct(true)
                    }}>
                        <FaPlus className={"cursor-pointer"} onClick={() => setAddProduct(true)}/>
                    </button>
                    <div className={"flex items-center bg-green-rgba p-2 mt-2 cursor-pointer rounded-3xl"} onClick={submit}>
                        <span className={"mr-4"}>{createOrder.productList.reduce((total, orderItem)=>total + (orderItem.product.price * orderItem.quantity), 0)}</span>
                        <button onClick={() => {
                        }}>Оплатити
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TestOrder
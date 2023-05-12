import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks/redux";
import {useRouter} from "next/router";
import {getSingleProduct} from "@/store/reducers/products/productThunks";
import {Product} from "@/store/models/Product";
import {BiArrowBack, BiPen} from "react-icons/bi";
import ProductField from "@/components/products/ProductField";


const ProductsDetails: FC = () => {

    const dispatch = useAppDispatch()
    const router = useRouter()

    const product: Product = useAppSelector((state) => state.product.currentItem)
    const email = useAppSelector((state) => state.auth.email)

    useEffect(() => {
        if (router.query.id) {
            dispatch(getSingleProduct({id: router.query.id.toString()}))
        }
        if (!email) {
            router.push('/auth/login')
        }
    }, [])

    return (
        <div className={"min-h-screen max-w-full p-4"}>
            <BiArrowBack className={"text-3xl mb-4 mt-4 cursor-pointer"} onClick={() => {
                router.back()
            }}/>
            <ProductField title={"Назва"} value={product?.name} name={"name"} id={product?.id?.toString()}/>
            <ProductField title={"Повна назва"} value={product?.title} name={"title"} id={product?.id?.toString()}/>
            {/* Короче в тому product дофіга різної галіматні, яку можна по-різному відображати
                Роби з цим, що хочеш
                TODO: для тої всьої галіматні норм дизайн зробити
             */}
            <ProductField title={"Ціна в шекелях"} value={product?.price} name={"price"} id={product?.id?.toString()}/>
            <ProductField title={"тут потім буде картинка"} value={product?.imgName} name={"imgName"} id={product?.id?.toString()}/>
            <ProductField title={"Упакування"} value={product?.packagement} name={"packagement"} id={product?.id?.toString()}/>
            <ProductField title={"Amplification"} value={product?.amplification} name={"amplification"} id={product?.id?.toString()}/>
        </div>
    )
}
export default ProductsDetails
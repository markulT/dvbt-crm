import {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks/redux";
import {useRouter} from "next/router";
import {getProductImage, getSingleProduct, setProductImage} from "@/store/reducers/products/productThunks";
import {Product} from "@/store/models/Product";
import {BiArrowBack, BiPen} from "react-icons/bi";
import ProductField from "@/components/products/ProductField";
import {FaPlus} from "react-icons/fa";


const ProductsDetails: FC = () => {

    const dispatch = useAppDispatch()
    const router = useRouter()

    const product: Product = useAppSelector((state) => state.product.currentItem)
    const email = useAppSelector((state) => state.auth.email)
    const [imgCreate, setImgCreate] = useState<boolean>(false)
    const [image, setImage] = useState<any>()
    const imgUrl = useAppSelector((state)=>state.product.currentImageUrl)

    useEffect(() => {
        if (router.query.id) {
            dispatch(getSingleProduct({id: router.query.id.toString()}))
            dispatch(getProductImage({id:router.query.id.toString()}))
        }
        if (!email) {
            router.push('/auth/login')
        }
    }, [])

    function handleUpdateImage() {
        const formData = new FormData();
        formData.append("file", image, image.name)
        formData.append("productId", product.id?.toString())
        dispatch(setProductImage({formData:formData}))
    }

    return (
        <div className={"min-h-screen max-w-full p-4"}>
            <BiArrowBack className={"text-3xl mb-4 mt-4 cursor-pointer"} onClick={() => {
                router.back()
            }}/>

            <div>
                <div className={"flex cursor-pointer bg-gray-800 rounded-3xl p-2 items-center"} onClick={()=>setImgCreate(prev=>!prev)}>
                    <FaPlus />
                    <span className={"ml-2"}>Додати зображення</span>
                </div>
                <div className={`mt-4 ${imgCreate ? "visible":"hidden"}`}>
                    <form>
                        <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
                    </form>
                    <button onClick={handleUpdateImage} className={"rounded-3xl bg-gray-800 p-3 mt-4"}>Submit</button>
                </div>
            </div>

            <div className={"mt-4"}>
                <img src={imgUrl} alt="Image"/>
            </div>

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
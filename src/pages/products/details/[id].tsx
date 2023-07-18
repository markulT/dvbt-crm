import {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks/redux";
import {useRouter} from "next/router";
import {
    getProductImage,
    getSingleProduct,
    setProductImage,
    updateProductCategory
} from "@/store/reducers/products/productThunks";
import {Product} from "@/store/models/Product";
import {BiArrowBack, BiPen} from "react-icons/bi";
import ProductField from "@/components/products/ProductField";
import {FaPlus} from "react-icons/fa";
import {getAllCategories} from "@/store/reducers/category/categoryThunks";
import RadioInput from "@/components/RadioInput";
import Image from "next/image";


const ProductsDetails: FC = () => {

    const dispatch = useAppDispatch()
    const router = useRouter()

    const product: Product = useAppSelector((state) => state.product.currentItem)
    const email = useAppSelector((state) => state.auth.email)
    const [imgCreate, setImgCreate] = useState<boolean>(false)
    const [image, setImage] = useState<any>()
    const imgUrl = useAppSelector((state) => state.product.currentImageUrl)
    const categoryList = useAppSelector((state) => state.categories.list)
    const [chosenCategory, setChosenCategory] = useState<string>('')
    async function fetchData() {
        if (router.query.id) {
            dispatch(getSingleProduct({id: router.query.id.toString()}))
            dispatch(getProductImage({id: router.query.id.toString()}))
            dispatch(getAllCategories())
        }
        if (!email) {
            router.push('/auth/login')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    async function handleUpdateImage() {
        const formData = new FormData();

        formData.append("file", image, image.name)
        //@ts-ignore
        formData.append("productId", product.id?.toString())
        // console.log(formData.get("file"))
        //@ts-ignore
        await dispatch(setProductImage({formData: formData}))
        fetchData()
    }

    async function assignCategory() {
        //@ts-ignore
        if(chosenCategory == null || product.id == undefined) {
            return
        }
        await dispatch(updateProductCategory({categoryId:chosenCategory, productId:product.id?.toString()}))
        fetchData()
    }


    return (
        <div className={"min-h-screen max-w-full p-4"}>
            <BiArrowBack className={"text-3xl mb-4 mt-4 cursor-pointer"} onClick={() => {
                router.back()
            }}/>

            <div>
                <div className={"flex cursor-pointer bg-gray-800 rounded-3xl p-2 items-center"}
                     onClick={() => setImgCreate(prev => !prev)}>
                    <FaPlus/>
                    <span className={"ml-2"}>Додати зображення</span>
                </div>
                <div className={`mt-4 ${imgCreate ? "visible" : "hidden"}`}>
                    <form>
                        <input type="file" onChange={(e) => {
                            //@ts-ignore
                            setImage(e.target.files[0])
                        }}/>
                    </form>
                    <button onClick={handleUpdateImage} className={"rounded-3xl bg-gray-800 p-3 mt-4"}>Submit</button>
                </div>
            </div>

            <div className={"mt-4"}>
                <Image width={500} height={500} src={imgUrl} alt="Image"/>
            </div>
            {/*@ts-ignore*/}
            <ProductField title={"Назва"} value={product?.name} name={"name"} id={product?.id?.toString()} refreshCallback={fetchData}/>
            {/*@ts-ignore*/}
            <ProductField title={"Повна назва"} value={product?.title} name={"title"} id={product?.id?.toString()} refreshCallback={fetchData}/>
            {/* Короче в тому product дофіга різної галіматні, яку можна по-різному відображати
                Роби з цим, що хочеш
                TODO: для тої всьої галіматні норм дизайн зробити
             */}
            {/*@ts-ignore*/}
            <ProductField title={"Ціна в шекелях"} value={product?.price} name={"price"} refreshCallback={fetchData} id={product?.id?.toString()}/>
            {/*@ts-ignore*/}
            <ProductField title={"тут потім буде картинка"} value={product?.imgName} refreshCallback={fetchData} name={"imgName"}
                //@ts-ignore
                          id={product?.id?.toString()}/>
            {/*@ts-ignore*/}
            <ProductField title={"Упакування"} refreshCallback={fetchData} value={product?.packagement} name={"packagement"}
                //@ts-ignore
                          id={product?.id?.toString()}/>
            {/*@ts-ignore*/}
            <ProductField refreshCallback={fetchData} title={"Amplification"} value={product?.amplification} name={"amplification"}
                //@ts-ignore
                          id={product?.id?.toString()}/>
            {/*@ts-ignore*/}
            <ProductField refreshCallback={fetchData} title={"Канали"} value={product?.chanel} name={"chanel"}
                //@ts-ignore
                          id={product?.id?.toString()}/>
            {/*@ts-ignore*/}
            <ProductField refreshCallback={fetchData} title={"Довжина (см)"} castTo={"number"} value={product?.length} name={"length"}
                          //@ts-ignore
                          id={product?.id?.toString()}/>
            {/*@ts-ignore*/}
            <ProductField refreshCallback={fetchData} title={"Максимально допустима відстань сигналу в метрах (при ідеальних умовах)"} castTo={"number"} value={product?.rangeInMeters} name={"rangeInMeters"}
                //@ts-ignore
                          id={product?.id?.toString()}/>

            <div className={"mt-4"}>
                <h3 className={"text-2xl"}>Оберіть категорію</h3>

                {chosenCategory}
                {/*@ts-ignore*/}
                {categoryList.map((category)=><RadioInput value={category.id} key={category.id} title={category.name} setValue={setChosenCategory} name={'category'} />)}

                <button className={"p-4 bg-gray-800 rounded-lg"} onClick={assignCategory}>
                    Submit
                </button>

            </div>

        </div>
    )
}
export default ProductsDetails
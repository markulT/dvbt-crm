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
import BannerTextArea from "@/components/banners/BannerTextArea";


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
        await fetchData()
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
        <div className={"min-h-screen bg-white-bg w-screen p-4 text-blue-5"}>
            <BiArrowBack className={"text-3xl mb-4 mt-4 cursor-pointer"} onClick={() => {
                router.back()
            }}/>
            <div className={"flex flex-row justify-between"}>
                <div>
                    <div className={"grid grid-cols-3 gap-y-16"}>
                        {/*@ts-ignore*/}
                        <ProductField title={"Назва"} value={product?.name} name={"name"} id={product?.id?.toString()} refreshCallback={fetchData}/>


                        {/*@ts-ignore*/}
                        <ProductField title={"Повна назва"} value={product?.title} name={"title"} id={product?.id?.toString()} refreshCallback={fetchData}/>
                        {/* Короче в тому product дофіга різної галіматні, яку можна по-різному відображати
                Роби з цим, що хочеш
                TODO: для тої всьої галіматні норм дизайн зробити
             */}
                        {/*@ts-ignore*/}
                        <ProductField title={"Ціна в шекелях"} value={product?.price} name={"price"} castTo={"number"} refreshCallback={fetchData} id={product?.id?.toString()}/>
                        {/*@ts-ignore*/}
                        <ProductField title={"тут потім буде картинка"} value={product?.imgName} refreshCallback={fetchData} name={"imgName"}
                            //@ts-ignore
                                      id={product?.id?.toString()}/>
                        {/*@ts-ignore*/}
                        <ProductField title={"Упакування"} refreshCallback={fetchData} value={product?.packagement} name={"packagement"}
                            //@ts-ignore
                                      id={product?.id?.toString()}/>
                        {/*@ts-ignore*/}
                        <ProductField refreshCallback={fetchData} title={"Amplification"} castTo={"number"} value={product?.amplification} name={"amplification"}
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
                    </div>
                    <div className={"mt-16"}>
                        {/*@ts-ignore*/}
                        <ProductField refreshCallback={fetchData} className={"mt-16"} title={"Максимально допустима відстань сигналу в метрах (при ідеальних умовах)"} castTo={"number"} value={product?.rangeInMeters} name={"rangeInMeters"}
                            //@ts-ignore
                                      id={product?.id?.toString()}/>

                        <div className={"mt-16"}>
                            <h4 className={"text-xl "}>Оберіть категорію</h4>

                            {/*{chosenCategory}*/}
                            {/*@ts-ignore*/}
                            {categoryList.map((category)=><RadioInput value={category.id} key={category.id} title={category.name} setValue={setChosenCategory} name={'category'} />)}

                            <button className={"mt-4 px-16 py-4 bg-blue-4 hover:bg-blue-5 transition-all duration-500 text-white rounded-lg"} onClick={assignCategory}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>


                <div>
                    <div className={"mt-4"}>
                        <Image width={500} height={500} src={imgUrl} alt="Image" className={"rounded-xl"}/>
                    </div>
                    {/*<div className={"flex cursor-pointer bg-blue-5 text-white rounded-3xl p-2 items-center"}*/}
                    {/*     onClick={() => setImgCreate(prev => !prev)}>*/}
                    {/*    <FaPlus/>*/}
                    {/*    <span className={"ml-2"}>Додати зображення</span>*/}
                    {/*</div>*/}
                    <div className={"mt-4 text-white"}>
                        <span className={"max-w-lg flex items-center cursor-pointer bg-blue-4 hover:bg-blue-5 transition-all duration-500 p-4 rounded-2xl unselectable "}
                              onClick={() => setImgCreate(prev => !prev)}>
                            <FaPlus className={"mr-2"}/>
                            <p>Додати зображення</p>
                        </span>
                    </div>
                    <div>

                        <div className={`mt-4 ${imgCreate ? "visible" : "hidden"}`}>
                            <form>
                                <input type="file" onChange={(e) => {
                                    //@ts-ignore
                                    setImage(e.target.files[0])
                                }}/>
                            </form>
                            <button onClick={handleUpdateImage} className={"w-full text-white rounded-xl bg-blue-4 hover:bg-blue-5 transition-all duration-500 p-3 mt-4"}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    )
}
export default ProductsDetails

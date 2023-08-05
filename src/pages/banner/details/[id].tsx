import {FC, useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "@/store/hooks/redux";
import {Banner} from "@/store/models/Banner";
import {getBannerById, getBannerImage, updateBannerImage} from "@/store/reducers/banners/bannerThunks";
import {setProductImage} from "@/store/reducers/products/productThunks";
import {BiArrowBack} from "react-icons/bi";
import {FaPlus} from "react-icons/fa";
import Image from "next/image";
import {rootReducer} from "@/store";
import BannerField from "@/components/banners/BannerField";
import BannerTextArea from "@/components/banners/BannerTextArea";


const BannerDetails:FC = () => {

    const router = useRouter()
    const {id} = router.query
    const dispatch = useAppDispatch()
    const currentBanner:Banner = useAppSelector((state)=>state.banners.currentItem)
    const bannerImage = useAppSelector((state)=>state.banners.currentImgUrl)
    const email = useAppSelector((state) => state.auth.email)
    const [image, setImage] = useState<any>()
    const [imgCreate, setImgCreate] = useState<boolean>(false)

    async function fetchData() {
        // console.log(router.query.id?.toString())
        if(router.query.id) {
            console.log('render')
            dispatch(getBannerById(
                {id: router.query.id?.toString()}
            ))
            dispatch(getBannerImage(
                {imgName: router.query.id?.toString()}
            ))
        }
        if (!email) {
            router.push('/auth/login')
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
    async function handleUpdateImage() {
        const formData = new FormData();

        formData.append("file", image, image.name)
        //@ts-ignore
        formData.append("id", currentBanner.id?.toString())
        // console.log(formData.get("file"))
        //@ts-ignore
        await dispatch(updateBannerImage({formData: formData}))
        await fetchData()
    }


    return (
        <div className={"min-h-screen w-full p-4 bg-white-bg text-blue-5"}>
            <BiArrowBack className={"text-3xl mb-4 mt-4 cursor-pointer"} onClick={() => {
                router.back()
            }}/>
            <div className={"flex flex-row-reverse justify-between"}>
                <div>
                    <div className={"mt-4"}>
                        <Image width={500} height={500} src={bannerImage} alt="Image" className={"rounded-xl"}/>
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
                <div className={"flex flex-col gap-4"}>
                    {/*@ts-ignore*/}
                    <BannerField title={"Заголовок"} value={currentBanner.title} name={"title"} refreshCallback={fetchData} id={currentBanner.id?.toString()} />
                    {/*@ts-ignore*/}
                    <BannerTextArea title={"Контент"} value={currentBanner.content} name={"content"} refreshCallback={fetchData} id={currentBanner.id?.toString()}/>
                    {/*@ts-ignore*/}
                    <BannerTextArea title={"Посилання"} value={currentBanner.detailsLink} name={"detailsLink"} refreshCallback={fetchData} id={currentBanner.id?.toString()}/>
                </div>
            </div>
        </div>
    )
}
export default BannerDetails

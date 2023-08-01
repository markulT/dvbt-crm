import {FC} from "react";
import {Banner} from "@/store/models/Banner";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "@/store/hooks/redux";
import {deleteBanner, getBannerPage} from "@/store/reducers/banners/bannerThunks";
import {BiPen, BiTrash} from "react-icons/bi";

const BannerElement:FC<Banner> = ({title, imgName, content, detailsLink, id}) =>{

    const router = useRouter()
    const dispatch = useAppDispatch()

    async function handleDeleteBanner() {
        //@ts-ignore
        await dispatch(deleteBanner({id:id?.toString()}))
        router.push(`/banner/1`)
    }

    return (
        //@ts-ignore
        <div className={"relative w-full flex justify-between text-blue-5 drop-shadow-3xl shadow-blue-5 items-center bg-white mt-4 p-4 rounded-2xl"} >
            <div onClick={()=>{
                router.push(`/banner/details/${id}`)
            }}>
                <p className={'text-blue-4 text-sm'}>Назва</p>
                <span className={"cursor-pointer text-xl font-medium text-blue-5"}>{title}</span>
            </div>
            <div>
                <p className={'text-blue-4 text-sm'}>Посилання</p>
                <span className={"cursor-pointer text-xl font-medium text-blue-5"}>{detailsLink}</span>
            </div>
            <div className={''}>
                <BiTrash className={"ml-4 text-2xl text-red-700 cursor-pointer"} />
            </div>
        </div>
        // <div className={"flex"} onClick={()=>{
        //     router.push(`/banner/details/${id}`)
        // }}>
        //     <span>{title}</span>
        //     <span>{detailsLink}</span>
        // </div>
    )
}
export default BannerElement

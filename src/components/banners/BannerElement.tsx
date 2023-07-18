import {FC} from "react";
import {Banner} from "@/store/models/Banner";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "@/store/hooks/redux";
import {deleteBanner, getBannerPage} from "@/store/reducers/banners/bannerThunks";

const BannerElement:FC<Banner> = ({title, imgName, content, detailsLink, id}) =>{

    const router = useRouter()
    const dispatch = useAppDispatch()

    async function handleDeleteBanner() {
        //@ts-ignore
        await dispatch(deleteBanner({id:id?.toString()}))
        router.push(`/banner/1`)
    }

    return (
        <div className={"flex"} onClick={()=>{
            router.push(`/banner/details/${id}`)
        }}>
            <span>{title}</span>
            <span>{detailsLink}</span>
        </div>
    )
}
export default BannerElement
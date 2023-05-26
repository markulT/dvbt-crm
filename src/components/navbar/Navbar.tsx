// import {AiOutlineUser, BiCart, BiRadio, FcEngineering, TbEngine} from "react-icons/all";
import {useRouter} from "next/router";
import {AiOutlineTag, AiOutlineUser} from "react-icons/ai"
import {BiCart, BiRadio} from "react-icons/bi"
import {TbEngine} from "react-icons/tb"
import {FaUserTag} from "react-icons/fa";
import {useAppSelector} from "@/store/hooks/redux";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store";

export default function Navbar() {

    const router = useRouter();
    const email = useAppSelector(state=>state.auth.email)


    function goTo(url:string) {
        router.push(`/${url}`)
    }

    return (
        <div className={"OutterFlexBox flex bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"}>
            <div className={"InnerFlexBox py-10 flex flex-col "}>

                <div className={"pl-4 pr-4 flex items-center"}>
                    <AiOutlineUser className={"text-3xl mr-2"}/>
                    <p className={"text-xl"}>{email ? email : "Not logined"}</p>
                </div>

                <div className={"pl-4 pr-4 flex items-center cursor-pointer"} onClick={()=>goTo('clients/1')}>
                    <AiOutlineUser className={"text-3xl mr-2 wtfanimation"}/>
                    <p className={"text-xl"}>Клієнти</p>
                </div>

                <div className={"pl-4 pr-4 flex items-center cursor-pointer"} onClick={()=>goTo('category')}>
                    <AiOutlineTag className={"text-3xl mr-2"}/>
                    <p className={`text-xl ${process.env.MEME_MODE ? "letterMeme" : ""}`}>Категорії</p>
                </div>

                <div className={"pl-4 mt-1 pr-4 flex items-center cursor-pointer"} onClick={()=>goTo('engineers/1')}>
                    <TbEngine className={"text-3xl mr-2"}/>
                    <p className={"text-xl"}>Інсталлятори</p>
                </div>

                <div className={"pl-4 mt-1 pr-4 flex items-center cursor-pointer"} onClick={()=>goTo('towers')}>
                    <BiRadio className={"text-3xl mr-2 infinitSpin"}/>
                    <p className={"text-xl"}>DVBT передатчики</p>
                </div>

                <div className={"pl-4 mt-1 pr-4 flex items-center cursor-pointer"} onClick={()=>goTo('products/1')}>
                    <BiCart className={"text-3xl mr-2"}/>
                    <p className={`text-xl ${process.env.MEME_MODE ? 'bouncing-text' :''}`}>Товари</p>
                </div>

                <div className={"pl-4 mt-1 pr-4 flex items-center cursor-pointer"} onClick={()=>goTo('orders/1')}>
                    <BiCart className={`text-3xl mr-2 ${process.env.MEME_MODE ? "wiggling-button" : ""}`}/>
                    <p className={"text-xl"}>Замовлення</p>
                </div>

                <div className={"pl-4 mt-1 pr-4 flex items-center cursor-pointer"} onClick={()=>goTo('auth/login')}>
                    <FaUserTag className={"text-3xl mr-2"}/>
                    <p className={`text-xl ${process.env.MEME_MODE ? "rainbow_anim" : ""}`}>Авторизація</p>
                {/*    a*/}
                </div>

            </div>
        </div>
    )
}
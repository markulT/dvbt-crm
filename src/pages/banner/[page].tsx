import {BiLeftArrow, BiRightArrow, BiSearch} from "react-icons/bi";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks/redux";
import {useRouter} from "next/router";
import {getPageClients} from "@/store/reducers/clientReducer";
import ClientElement from "@/components/ClientElement";
import Paginator from "@/components/Paginator";
import OrderElement from "@/components/orders/orderElement";
import {createBanner, getBannerPage} from "@/store/reducers/banners/bannerThunks";
import BannerElement from "@/components/banners/BannerElement";


export default function Clients() {

    const [searchFocused, setSearchFocused] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('')
    // const {clientList, error, length} = useAppSelector(state=>state.clients)
    const bannerList = useAppSelector((state)=>state.banners.list)
    const length = useAppSelector((state)=>state.banners.length)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const email = useAppSelector(state=>state.auth.email)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [create, setCreate] = useState<boolean>(false)
    const [detailsLink, setDetailsLink] = useState('')


    async function submitCreate() {
        if (content == '' || detailsLink == '' || title == '') {
            return
        }
        await dispatch(createBanner({
            content: content, detailsLink: detailsLink, imgName: "", title: title
        }))
        dispatch(getBannerPage({pageNumber: Number(router.query.page), pageSize:20}))
    }

    useEffect(()=>{
        dispatch(getBannerPage({pageNumber: Number(router.query.page), pageSize:20}))
    },[router.query.page])
    useEffect(()=>{
        if (!email) {
            router.push("/auth/login")
        }
    }, [])

    return (
        <div className={"flex flex-row bg-white-bg min-h-screen w-screen p-4"}>
            <div className={"bg-gray-800 w-full p-3 rounded-3xl"}>

                <div className={`flex w-full items-center ${searchFocused ? "outline-amber-50" : "outline-amber-200"}`}>
                    <div className={`flex w-full bg-white p-2 rounded-2xl items-center justify-between`}>
                        <input className={"p-2 w-full bg-transparent text-blue-5 font-medium placeholder-blue-4 focus:outline-0"} value={search}
                               onChange={(e) => {
                                   setSearch(e.target.value.toString())
                               }} type="text" placeholder={"Пошук..."} onFocus={() => setSearchFocused(true)}/>
                        <BiSearch className={"text-2xl text-blue-5 m-2 hover:scale-110 hover:text-blue-6 transition-all duration-500"} onClick={()=>{
                            console.log(bannerList)}}/>
                    </div>
                </div>

                <div className={"flex flex-col w-full"}>

                    {bannerList ? bannerList.map((banner)=>(<BannerElement key={banner?.id?.toString()} content={banner.content} title={banner.title} id={banner.id?.toString()} imgName={banner.imgName} detailsLink={banner.detailsLink}/>)) : ''}
                </div>

                <div className={'flex'}>
                    <Paginator name={'banner'} length={length} pageSize={20}/>
                </div>


            </div>
            <div className={`w-full mb-8 h-full items-center justify-center  ${!create ? "visible" : "hidden"}`} onClick={(e) => {
                // console.log(e.target.closest('div.absolute') == e.target)
                // setCreate(false)
                if (e.target.closest('div.absolute') == e.target) setCreate(false)
            }}>
                <div className={"h-full bg-white rounded-3xl "}>
                    <div className="flex flex-col  mt-4 h-2/3 p-4 items-center justify-between py-4 ">
                        <p className={"text-blue-5 font-semibold text-xl"}>Додати баннер</p>
                        <input
                            className="p-4 py-4 font-medium rounded-xl text-blue-5 w-full border-blue-5 border-2 placeholder-blue-4 focus:outline-0"
                            type="text"
                            onChange={(e) => { setTitle(e.target.value) }}
                            value={title}
                            placeholder="Заголовок.........."
                        />
                        <input
                            className="p-4 py-4 font-medium rounded-xl text-blue-5 w-full border-blue-5 border-2 placeholder-blue-4 focus:outline-0"
                            type="text"
                            onChange={(e) => { setContent(e.target.value) }}
                            value={content}
                            placeholder="Контент.."
                        />
                        <input
                            className="p-4 py-4 font-medium rounded-xl text-blue-5 w-full border-blue-5 border-2 placeholder-blue-4 focus:outline-0"
                            type="text"
                            onChange={(e) => { setDetailsLink(e.target.value) }}
                            value={detailsLink}
                            placeholder="Посилання на деталі.."
                        />
                        <button onClick={submitCreate} className="bg-gradient-to-tr from-blue-5 to-blue-4 rounded-2xl p-4 w-full">Створити</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

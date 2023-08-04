import {BiSearch} from "react-icons/bi";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks/redux";
import {useRouter} from "next/router";
import {getPageClients} from "@/store/reducers/clientReducer";
import ClientElement from "@/components/ClientElement";
import Paginator from "@/components/Paginator";
import OrderElement from "@/components/orders/orderElement";
import Link from "next/link";
import {MdNavigateBefore, MdNavigateNext} from "react-icons/md";


export default function Clients() {

    const [searchFocused, setSearchFocused] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('')
    const {clientList, error, length} = useAppSelector(state=>state.clients)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const email = useAppSelector(state=>state.auth.email)

    useEffect(()=>{
        dispatch(getPageClients({pageNumber: Number(router.query.page), pageSize:50}))
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
                        <BiSearch className={"text-2xl text-blue-5 m-2 hover:scale-110 hover:text-blue-6 transition-all duration-500"}/>
                    </div>
                </div>

                <div className={"flex flex-col w-full"}>
                    {/* eslint-disable-next-line react/jsx-key */}
                    {clientList ? clientList.map((client)=>(<ClientElement fullName={client.fullName} email={client.email} id={client.id}/>)) : ''}
                </div>
                <div className={'flex mt-4'}>
                    {Number(router.query.page) != 1 && <Link href={`/orders/${Number(router.query.page) - 1}`}>
                        <MdNavigateBefore className='text-4xl cursor-pointer active:animate-left_pag_animate'/>
                    </Link>}
                    <Link href={`/orders/${Number(router.query.page) + 1}`}>
                        <MdNavigateNext className={'ml-4 text-4xl cursor-pointer active:animate-right_pag_animate'}/>
                    </Link>
                </div>

            </div>
        </div>
    )
}

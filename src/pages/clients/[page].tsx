import {BiSearch} from "react-icons/bi";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks/redux";
import {useRouter} from "next/router";
import {getPageClients} from "@/store/reducers/clientReducer";
import ClientElement from "@/components/ClientElement";
import Paginator from "@/components/Paginator";


export default function Clients() {

    const [searchFocused, setSearchFocused] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('')
    const {clientList, error, length} = useAppSelector(state=>state.clients)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const email = useAppSelector(state=>state.auth.email)

    useEffect(()=>{
        dispatch(getPageClients({pageNumber: Number(router.query.page), pageSize:5}))
    },[router.query.page])
    useEffect(()=>{
        if (!email) {
            router.push("/auth/login")
        }
    }, [])



    return (
        <div className={'flex-1 min-h-screen min-w-screen p-4'}>
            <div className={"bg-gray-800 w-full p-3 rounded-3xl"}>

                <div className={`flex items-center ${searchFocused ? "outline-amber-50" : "outline-amber-200"}`}>
                    <input className={"p-2 bg-transparent rounded-3xl focus:outline-0"} value={search} onChange={(e)=>{
                        setSearch(e.target.value.toString())
                    }} type="text" placeholder={"Search..."} onFocus={()=>setSearchFocused(true)}/>
                    <BiSearch className={"text-3xl"} />
                </div>

                <div>
                    {clientList ? clientList.map((client)=>(<ClientElement fullName={client.fullName} email={client.email} id={client.id}/>)) : ''}
                </div>

                <Paginator name={"clients"} length={length} pageSize={5}/>

            </div>
        </div>
    )
}
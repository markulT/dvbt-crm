import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks/redux";
import {getClient} from "@/store/reducers/clientReducer";
import {useRouter} from "next/router";
import {IFullClient} from "@/store/models/IClient";
import {FaUserTag} from "react-icons/fa";
import {BiArrowBack} from "react-icons/bi";


const ClientPage:FC = () => {

    const dispatch = useAppDispatch()
    const router = useRouter()
    const client:IFullClient = useAppSelector(state=>state.clients.currentClient)

    useEffect(()=>{
        dispatch(getClient({id:String(router.query.id)}))
    }, [])



    return (
        <div className={"min-h-screen bg-white-bg w-screen p-4 text-blue-5"}>

            <BiArrowBack className={"text-3xl mb-4 mt-4 cursor-pointer"} onClick={()=>{router.back()}} />

            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <h2 className={"text-xl"}>Ім'я:</h2>
            <span className={"text-2xl font-bold"}>{client?.fullName}</span>
            <h2 className={"text-xl mt-4"}>Email:</h2>
            <span className={"text-2xl font-bold"}>{client?.email}</span>


        </div>
    )
}
export default ClientPage

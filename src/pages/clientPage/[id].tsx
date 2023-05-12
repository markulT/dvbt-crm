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
        <div className={"min-h-screen"}>

            <BiArrowBack className={"text-3xl mb-4 mt-4 cursor-pointer"} onClick={()=>{router.back()}} />

            <h2>{client?.fullName}</h2>
            <div className={"flex mt-4"}>
                <FaUserTag className={"text-2xl"} />
                <h3>{client?.email}</h3>
            </div>


        </div>
    )
}
export default ClientPage
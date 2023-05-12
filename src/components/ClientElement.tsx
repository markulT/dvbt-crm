import {FC} from "react";
import {useRouter} from "next/router";
import {BiTrash} from "react-icons/bi";
import {useAppDispatch} from "@/store/hooks/redux";
import {deleteClient, getPageClients} from "@/store/reducers/clientReducer";

interface IClientElementProps {
    fullName:string,
    email:string,
    id:string
}

const ClientElement:FC<IClientElementProps> = ({fullName, email, id}) => {

    const router = useRouter()
    const dispatch = useAppDispatch()

    async function deleteUser() {
        await dispatch(deleteClient({id:id}))
        refreshClients()
    }

    function refreshClients() {
        dispatch(getPageClients({pageSize:5, pageNumber:Number(router.query.page)}))
    }

    return (
        <div className={"flex border-amber-950 mb-4 border-2 grow-0 justify-start"}>
            <div onClick={()=>{router.push(`/clientPage/${id}`)}}>{fullName}</div>
            <div onClick={()=>{router.push(`/clientPage/${id}`)}} className={"ml-4"}>{email}</div>
            <BiTrash className={"ml-4 text-red-700 text-2xl cursor-pointer"} onClick={deleteUser} />
        </div>
    )
}

export default ClientElement;
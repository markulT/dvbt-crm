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
        <div className={"relative shadow-blue-5 grid grid-cols-4 grid-rows-1 items-center bg-white mt-4 p-4 rounded-2xl"}>
            <div >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p className={'text-blue-4 text-sm'}>Ім'я</p>
                <span className={"cursor-pointer text-xl font-medium text-blue-5"} onClick={()=>{router.push(`/clientPage/${id}`)}}>{email}</span>
            </div>
            <div >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p className={'text-blue-4 text-sm'}>Email</p>
                <span className={"cursor-pointer text-xl font-medium text-blue-5"} onClick={()=>{router.push(`/clientPage/${id}`)}}>{fullName}</span>
            </div>
            <BiTrash className={"absolute right-4 text-2xl text-blue-5 cursor-pointer"} onClick={deleteUser} />
        </div>
    )
}

export default ClientElement;

import {FC} from "react";
import {useRouter} from "next/router";
import {BiTrash} from "react-icons/bi";
import {useAppDispatch} from "@/store/hooks/redux";
import {deleteEngineerThunk, getAllEngineers} from "@/store/reducers/engineers/engineerThunk";

interface EngineerElementProps {
    email:string,
    fullName:string,
    id:string,
}

const EngineerElement:FC<EngineerElementProps> = ({email, fullName, id}) => {

    const router = useRouter()
    const dispatch = useAppDispatch()

    async function deleteEngineer() {
        await dispatch(deleteEngineerThunk({id:id}))
        dispatch(getAllEngineers({pageNumber:Number(router.query.page), pageSize:10}))
    }

    return (
        <div className={"flex items-center"} onClick={()=>{router.push(`/engineer/details/${id}`)}}>
            <span>{email}</span>
            <span className={"ml-4"}>{fullName}</span>
            <BiTrash className={"text-2xl ml-4 text-red-700"} onClick={deleteEngineer} />
        </div>
    )
}
export default EngineerElement
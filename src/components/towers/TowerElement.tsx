import {FC} from "react";
import {useRouter} from "next/router";
import {useAppDispatch} from "@/store/hooks/redux";
import {deleteTower, getAll} from "@/store/reducers/tower/towerThunks";
import {BiTrash} from "react-icons/bi";

interface TowerElementProps {
    name:string,
    id:string,
    rangeInMeters:number,
    longitude:number,
    latitude:number
}

const TowerElement:FC<TowerElementProps> = ({name, latitude, longitude, rangeInMeters, id}) => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    async function handleDeleteTower() {
        await dispatch(deleteTower({id:id}))
        dispatch(getAll())
    }


    return (
        <div className={"flex items-center bg-gray-800 mt-4 p-2"}>
            <span className={"cursor-pointer"} onClick={()=>{router.push(`/towers/details/${id}`)}}>{name}</span>
            <span className={"ml-4"}>{latitude}</span>
            <span className={"ml-4"}>{longitude}</span>
            <span className={"ml-4"}>{rangeInMeters}</span>
            <BiTrash className={"ml-4 text-2xl text-red-700 cursor-pointer"} onClick={handleDeleteTower} />
        </div>
    )
}

export default TowerElement
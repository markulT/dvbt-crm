import {FC} from "react";
import {useRouter} from "next/router";

interface TowerElementProps {
    name:string,
    id:string,
    rangeInMeters:number,
    longitude:number,
    latitude:number
}

const TowerElement:FC<TowerElementProps> = ({name, latitude, longitude, rangeInMeters, id}) => {
    const router = useRouter()
    return (
        <div className={"flex items-center bg-gray-800 mt-4 p-2"}>
            <span className={"cursor-pointer"} onClick={()=>{router.push(`/towers/details/${id}`)}}>{name}</span>
            <span className={"ml-4"}>{latitude}</span>
            <span className={"ml-4"}>{longitude}</span>
            <span className={"ml-4"}>{rangeInMeters}</span>
        </div>
    )
}

export default TowerElement
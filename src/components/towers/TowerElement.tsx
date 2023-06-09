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
        <div className={"relative shadow-blue-5 grid grid-cols-4 grid-rows-1 items-center bg-white mt-4 p-4 rounded-2xl"}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <div >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p className={'text-blue-4 text-sm'}>Ім'я</p>
                <span className={"cursor-pointer text-xl font-medium text-blue-5"} onClick={()=>{router.push(`/towers/details/${id}`)}}>{name}</span>
            </div>
            <div className={""}>
                <p className={'text-blue-4 text-sm'}>Широта</p>
                <span className={"text-xl font-medium text-blue-5"}>{latitude}</span>
            </div>
            <div className={""}>
                <p className={'text-blue-4 text-sm'}>Довгота</p>
                <span className={"text-xl font-medium text-blue-5"}>{longitude}</span>
            </div>
            <div className={""}>
                <p className={'text-blue-4 text-sm'}>Відстань в метрах</p>
                <span className={"text-xl font-medium text-blue-5"}>{rangeInMeters}</span>
            </div>
            <BiTrash className={"absolute right-4 text-2xl text-blue-5 cursor-pointer"} onClick={handleDeleteTower} />
        </div>
    )
}

export default TowerElement

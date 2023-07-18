import {FC, useEffect} from "react";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "@/store/hooks/redux";
import {setCurrentItem} from "@/store/reducers/tower/towerSlice";
import {Tower} from "@/store/models/Tower";

interface TowerPageProps {}

const TowerPage:FC<TowerPageProps> = () => {

    const router = useRouter()
    const dispatch = useAppDispatch()
    const email = useAppSelector((state)=>state.auth.email)
    const towerList = useAppSelector((state)=>state.tower.list)
    const tower:Tower = useAppSelector((state)=>state.tower.currentItem)

    useEffect(()=>{
        if(!email) {
            router.push("/auth/login")
        }
        // dispatch(setCurrentItem(towerList.filter(tower=>tower.id==router.query.id)))

        //@ts-ignore
        dispatch(setCurrentItem(towerList.filter(tower=>tower.id==router.query.id)))
    }, [])

    return (
        <div className={"min-h-screen flex-1"}>
            <span> {tower?.name?.toString() || ""} </span>
            <span> Широта{tower?.latitude}</span>
            <span>Довгота {tower?.longitude}</span>
            <span> Range {tower?.rangeInMeters} (метрів)</span>
        </div>
    )
}
export default TowerPage
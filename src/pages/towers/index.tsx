import {FC, useEffect, useState} from "react";
import {BiSearch} from "react-icons/bi";
import {FaPlus} from "react-icons/fa";
import {useAppDispatch, useAppSelector} from "@/store/hooks/redux";
import {createTower, deleteTower, getAll} from "@/store/reducers/tower/towerThunks";
import TowerElement from "@/components/towers/TowerElement";
import {Tower} from "@/store/models/Tower";

interface TowerProps {}

const Towers:FC<TowerProps> = () => {

    const [searchFocused, setSearchFocused] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('')
    const [create, setCreate] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const towers:Tower[] = useAppSelector(state=>state.tower.list)

    useEffect(()=>{
        dispatch(getAll())
    }, [])



    const [name, setName] = useState<string>('')
    const [longitude, setLongitude] = useState<string>("")
    const [latitude, setLatitude] = useState<string>("")
    const [rangeInMeters, setRangeInMeters] = useState<string>("")

    async function submitCreate() {
        await dispatch(createTower({latitude: Number(latitude), longitude: Number(longitude), name: name, rangeInMeters: Number(rangeInMeters)}))
        setLatitude("")
        setLongitude("")
        setRangeInMeters("")
        setName("")
        setCreate(false)
        dispatch(getAll())
    }

    return (
        <div className={"flex-1 min-h-screen min-w-screen p-4"}>
            <div className={`flex w-full items-center ${searchFocused ? "outline-amber-50" : "outline-amber-200"}`}>
                <input className={"p-2 bg-transparent rounded-3xl focus:outline-0"} value={search}
                       onChange={(e) => {
                           setSearch(e.target.value.toString())
                       }} type="text" placeholder={"Search..."} onFocus={() => setSearchFocused(true)}/>
                <BiSearch className={"text-3xl"}/>
                <button className={"justify-self-end rounded-[50%] bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 p-4"} onClick={()=>{setCreate(true)}}>
                    <FaPlus className={"text-l"} />
                </button>
                {/*<CreateCategoryPopup className={"absolute"} visible={create}  />*/}
                <div className={`h-screen w-screen flex items-center justify-center absolute top-0 left-0 z-10 backdrop-blur-lg ${create ? "visible" : "hidden"}`} onClick={(e) => {
                    // console.log(e.target.closest('div.absolute') == e.target)
                    // setCreate(false)
                    if (e.target.closest('div.absolute') == e.target) setCreate(false)
                }}>
                    <div className={"flex flex-col items-center px-4 py-8 bg-green-600 rounded-3xl z-30"}>
                        <input className={"p-2 color-red-500 bg-gray-800"} type="text" onChange={(e)=>{setName(e.target.value)}} value={name} placeholder={"Назва передатчика.."}/>
                        <input className={"p-2 color-red-500 bg-gray-800"} type="text" onChange={(e)=>{setLongitude(e.target.value)}} value={longitude} placeholder={"Longitude (довгота).."}/>
                        <input className={"p-2 color-red-500 bg-gray-800"} type="text" onChange={(e)=>{setLatitude(e.target.value)}} value={latitude} placeholder={"Latitude (широта).."}/>
                        <input className={"p-2 color-red-500 bg-gray-800"} type="text" onChange={(e)=>{setRangeInMeters(e.target.value)}} value={rangeInMeters} placeholder={"Радіус дії (у метрах).."}/>
                        <button onClick={submitCreate} className={"bg-orange-950 rounded-3xl mt-4 p-4"}>Створити</button>
                    </div>
                </div>
            </div>

            <div>
                {towers ? towers.map(tower=> <TowerElement name={tower.name} id={tower?.id?.toString()} rangeInMeters={tower.rangeInMeters} longitude={tower.longitude} latitude={tower.latitude} /> ) : ''}
            </div>
        </div>
    )
            }
export default Towers;
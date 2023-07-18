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
        <div className={"flex flex-row bg-white-bg min-h-screen w-screen p-4"}>
            <div className={"flex flex-col w-full"}>
                {towers ? towers.map(tower=> <TowerElement key={tower.id?.toString()} name={tower.name} id={tower?.id?.toString()} rangeInMeters={tower.rangeInMeters} longitude={tower.longitude} latitude={tower.latitude} /> ) : ''}
            </div>


            <div className={`flex flex-col w-1/3 items-start p-4 ${searchFocused ? "outline-amber-50" : "outline-amber-200"}`}>
                <div className={`flex w-full bg-white p-2 rounded-2xl items-center justify-between`}>
                    <input className={"p-2 w-full bg-transparent text-blue-5 font-medium placeholder-blue-4 focus:outline-0"} value={search}
                           onChange={(e) => {
                               setSearch(e.target.value.toString())
                           }} type="text" placeholder={"Пошук..."} onFocus={() => setSearchFocused(true)}/>
                    <BiSearch className={"text-2xl text-blue-5 m-2 hover:scale-110 hover:text-blue-6 transition-all duration-500"}/>
                    {/*<button className={"justify-self-end rounded-[50%] bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 p-4"} onClick={()=>{setCreate(true)}}>*/}
                    {/*    <FaPlus className={"text-l"} />*/}
                    {/*</button>*/}
                </div>


                {/*<CreateCategoryPopup className={"absolute"} visible={create}  />*/}
                <div className={`w-full mb-8 h-full items-center justify-center  ${!create ? "visible" : "hidden"}`} onClick={(e) => {
                    // console.log(e.target.closest('div.absolute') == e.target)
                    // setCreate(false)
                    if (e.target.closest('div.absolute') == e.target) setCreate(false)
                }}>
                    <div className={"h-full bg-white rounded-3xl "}>
                        <div className="flex flex-col  mt-4 h-2/3 p-4 items-center justify-between py-4 ">
                            <p className={"text-blue-5 font-semibold text-xl"}>Додати башту</p>
                            <input
                                className="p-4 py-4 font-medium rounded-xl text-blue-5 w-full border-blue-5 border-2 placeholder-blue-4 focus:outline-0"
                                type="text"
                                onChange={(e) => { setName(e.target.value) }}
                                value={name}
                                placeholder="Назва передатчика.."
                            />
                            <input
                                className="p-4 py-4 font-medium rounded-xl text-blue-5 w-full border-blue-5 border-2 placeholder-blue-4 focus:outline-0"
                                type="text"
                                onChange={(e) => { setLongitude(e.target.value) }}
                                value={longitude}
                                placeholder="Longitude (довгота)..."
                            />
                            <input
                                className="p-4 py-4 font-medium rounded-xl text-blue-5 w-full border-blue-5 border-2 placeholder-blue-4 focus:outline-0"
                                type="text"
                                onChange={(e) => { setLatitude(e.target.value) }}
                                value={latitude}
                                placeholder="Latitude (широта)..."
                            />
                            <input
                                className="p-4 py-4 font-medium rounded-xl text-blue-5 w-full border-blue-5 border-2 placeholder-blue-4 focus:outline-0"
                                type="text"
                                onChange={(e) => { setRangeInMeters(e.target.value) }}
                                value={rangeInMeters}
                                placeholder="Радіус дії (у метрах)..."
                            />
                            <button onClick={submitCreate} className="bg-gradient-to-tr from-blue-5 to-blue-4 rounded-2xl p-4 w-full">Створити</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
            }
export default Towers;

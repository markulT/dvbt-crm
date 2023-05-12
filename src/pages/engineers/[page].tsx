import {FC, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "@/store/hooks/redux";
import {BiSearch} from "react-icons/bi";
import OrderElement from "@/components/orders/orderElement";
import EngineerElement from "@/components/engineers/engineerElement";
import {getAllEngineers} from "@/store/reducers/engineers/engineerThunk";



const EngineersPage:FC = () => {


    const router = useRouter()
    const [searchFocused, setSearchFocused] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('')
    const [create, setCreate] = useState<boolean>(false)

    const engineers = useAppSelector((state)=>state.engineers.list)
    const email = useAppSelector((state)=>state.auth.email)

    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(!email) {
            router.push("/auth/login")
        }
        dispatch(getAllEngineers({pageNumber:Number(router.query.page), pageSize:10}))
    },[])

    return (
        <div className={'flex-1 min-h-screen min-w-screen p-4'}>
            <div className={"bg-gray-800 w-full p-3 rounded-3xl"}>

                <div className={`flex w-full items-center ${searchFocused ? "outline-amber-50" : "outline-amber-200"}`}>
                    <input className={"p-2 bg-transparent rounded-3xl focus:outline-0"} value={search}
                           onChange={(e) => {
                               setSearch(e.target.value.toString())
                           }} type="text" placeholder={"Search..."} onFocus={() => setSearchFocused(true)}/>
                    <BiSearch className={"text-3xl"}/>
                    {/*<button className={"justify-self-end rounded-[50%] bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 p-4"} onClick={()=>{setCreate(true)}}>*/}
                    {/*    <FaPlus className={"text-l"} />*/}
                    {/*</button>*/}
                    {/*/!*<CreateCategoryPopup className={"absolute"} visible={create}  />*!/*/}
                    {/*<div className={`h-screen w-screen flex items-center justify-center absolute top-0 left-0 z-10 backdrop-blur-lg ${create ? "visible" : "hidden"}`} onClick={(e) => {*/}
                    {/*    // console.log(e.target.closest('div.absolute') == e.target)*/}
                    {/*    // setCreate(false)*/}
                    {/*    if (e.target.closest('div.absolute') == e.target) setCreate(false)*/}
                    {/*}}>*/}
                    {/*    <div className={"flex flex-col items-center px-4 py-8 bg-green-600 rounded-3xl z-30"}>*/}
                    {/*        <input className={"p-2 color-red-500 bg-gray-800"} type="text" onChange={(e)=>{setName(e.target.value)}} value={name} placeholder={"Назва категорії.."}/>*/}
                    {/*        <button onClick={submitCreate} className={"bg-orange-950 rounded-3xl mt-4 p-4"}>Створити</button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>

                <div>
                    {engineers.map(engineer=><EngineerElement key={engineer.id} email={engineer.email} fullName={engineer.fullName} id={engineer.id} />)}
                </div>


            </div>
        </div>
    )
}
export default EngineersPage
import {FC, useEffect, useState} from "react";
import {BiSearch} from "react-icons/bi";
import ClientElement from "@/components/ClientElement";
import Paginator from "@/components/Paginator";
import {useAppDispatch, useAppSelector} from "@/store/hooks/redux";
import {useRouter} from "next/router";
import {createCategory, getAllCategories} from "@/store/reducers/category/categoryThunks";
import {FaPlus} from "react-icons/fa";
import CreateCategoryPopup from "@/components/categories/CreateCategoryPopup";
import CategoryElement from "@/components/categories/CategoryElement";
import TowerElement from "@/components/towers/TowerElement";


const CategoryPage: FC = () => {

    const [searchFocused, setSearchFocused] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('')
    const [create, setCreate] = useState<boolean>(false)
    const categories = useAppSelector(state=>state.categories.list)
    const router = useRouter()
    const dispatch = useAppDispatch()


    useEffect(()=>{
        if (!sessionStorage.getItem("accessToken")) {
            router.push("auth/login")
        }
        dispatch(getAllCategories())
    }, [])

    const [name,setName] = useState<string>('')
    async function submitCreate() {
        await dispatch(createCategory({name: name}))
        dispatch(getAllCategories())
        setName('')
    }
    return (
        <div className={"flex flex-row bg-white-bg min-h-screen w-screen p-4"}>
            <div className={"flex flex-col w-full"}>
                {categories?.map(category=><CategoryElement key={category.id} name={category.name} id={category.id} />)}
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
                    <div className={"h-full bg-white rounded-3xl"}>
                        <div className="flex flex-col  mt-4  p-4 items-center justify-between py-4 ">
                            <p className={"mt-4 text-blue-5 font-semibold text-xl"}>Додати категорію</p>
                            <input
                                className="mt-4 p-4 py-4 font-medium rounded-xl text-blue-5 w-full border-blue-5 border-2 placeholder-blue-4 focus:outline-0"
                                type="text" onChange={(e)=>{setName(e.target.value)}} value={name} placeholder={"Назва категорії.."}
                            />
                            <button onClick={submitCreate} className="mt-4 bg-gradient-to-tr from-blue-5 to-blue-4 rounded-2xl p-4 w-full">Створити</button>
                        </div>
                        <p className={"mt-4 p-4 text-blue-5 font-semibold text-xl"}>Я б, звісно, це нафіг звідси забрав, і додав оцю фічу десь в товари, бо по-суті тут тіки Назва, і на цьому все, тому ну таке це в 1 окрему сторінку виносити</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CategoryPage;

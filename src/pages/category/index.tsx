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
        <div className={'flex-1 min-h-screen min-w-screen p-4'}>
            <div className={"bg-gray-800 w-full p-3 rounded-3xl"}>

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
                            <input className={"p-2 color-red-500 bg-gray-800"} type="text" onChange={(e)=>{setName(e.target.value)}} value={name} placeholder={"Назва категорії.."}/>
                            <button onClick={submitCreate} className={"bg-orange-950 rounded-3xl mt-4 p-4"}>Створити</button>
                        </div>
                    </div>

                </div>
                    {categories?.map(category=><CategoryElement key={category.id} name={category.name} id={category.id} />)}
                <div>

                </div>


            </div>
        </div>
    )
}
export default CategoryPage;
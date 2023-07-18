import {FC, useState} from "react";
import {useAppDispatch} from "@/store/hooks/redux";
import {createCategory, ICreateCategory} from "@/store/reducers/category/categoryThunks";

interface IPopup {
    visible:boolean
}

const CreateCategoryPopup:FC<IPopup> = ({visible= false}) => {

    const dispatch = useAppDispatch()
    const [name, setName] = useState<string>()
    const [create, setCreate] = useState<boolean>(visible)
    function submitCreate() {
        if(name == '') {
            return
        }
        dispatch(
            createCategory({name: name} as ICreateCategory)
        )
    }

    return (
        <div className={"h-screen w-screen flex items-center justify-center absolute top-0 left-0 z-10 backdrop-blur-lg"} onClick={(e) => {
            if (e.target.closest('div.absolute') == e.target) setCreate(false)
        }}>
            <div className={"flex flex-col items-center px-4 py-8 bg-green-600 rounded-3xl"}>
                <input className={"p-2 color-red-500 bg-gray-800"} type="text" onChange={(e)=>{setName(e.target.value)}} value={name} placeholder={"Назва категорії.."}/>
                <button onClick={submitCreate} className={"bg-orange-950 rounded-3xl mt-4 p-4"}>Створити</button>
            </div>
        </div>
    )
}
export default CreateCategoryPopup;
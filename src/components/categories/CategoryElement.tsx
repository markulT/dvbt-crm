import {FC} from "react";
import {BiPen, BiTrash} from "react-icons/bi";
import {useAppDispatch} from "@/store/hooks/redux";
import {deleteCategoryThunk, getAllCategories} from "@/store/reducers/category/categoryThunks";

interface CategoryElementProps {
    name:string,
    id:string
}

const CategoryElement:FC<CategoryElementProps> = ({name, id}) => {

    const dispatch = useAppDispatch();

    async function deleteCategory() {
        await dispatch(deleteCategoryThunk({id:id}))
        dispatch(getAllCategories())
    }
    return (
        <div className={"relative text-blue-5 drop-shadow-3xl shadow-blue-5 grid grid-cols-2 grid-rows-1 items-center bg-white mt-4 p-4 rounded-2xl"}>
            <div>
                <p className={'text-blue-4 text-sm'}>Назва</p>
                <span className={"cursor-pointer text-xl font-medium text-blue-5"}>{name}</span>
            </div>
            <div className={'flex justify-end'}>
                <BiTrash className={"ml-4 text-2xl text-red-700 cursor-pointer"} onClick={deleteCategory} />
                <BiPen className={"ml-4 text-2xl text-yellow-400 cursor-pointer"} />
            </div>
        </div>
    )
}
export default CategoryElement;

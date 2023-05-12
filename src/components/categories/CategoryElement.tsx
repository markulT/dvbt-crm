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
        <div className={"flex items-center"}>
            <span>{name}</span>
            <BiTrash className={"ml-4 text-2xl text-red-700 cursor-pointer"} onClick={deleteCategory} />
            <BiPen className={"ml-4 text-2xl text-yellow-400 cursor-pointer"} />
        </div>
    )
}
export default CategoryElement;
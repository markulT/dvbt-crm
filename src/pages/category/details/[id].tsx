import {FC, useEffect, useState} from "react";
import {BiArrowBack, BiPen} from "react-icons/bi";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "@/store/hooks/redux";
import {
    addComplementaryToCategory,
    getAllCategories,
    getAllProducts,
    getCategory,
    getProductsByCategory, removeComplementaryFromCategory
} from "@/store/reducers/category/categoryThunks";
import CategoryItem from "@/components/categories/CategoryItem";
import {GetByIdRequest} from "@/store/types/getByIdRequest";
import ProductCard from "@/components/ProductCard";


const CategoryDetails: FC = () => {

    const router = useRouter()
    const {id} = router.query
    const dispatch = useAppDispatch()
    const [categoryId, setCategoryId] = useState<string>('')
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(50)
    const categoryList = useAppSelector((state) => state.categories.list)
    const currentCategory = useAppSelector((state) => state.categories.currentCategory)
    const productList = useAppSelector((state) => state.categories.productList)
    const [editingAdditionals, setEditingAdditionals] = useState<boolean>(false)

    async function handleGetAllProducts() {
        await dispatch(getAllProducts())
    }

    async function handleGetProductsByCategory() {
        await dispatch(getProductsByCategory({categoryId, page: {pageNumber, pageSize}}))
    }

    async function fetchData() {
        await dispatch(getCategory({id: id} as GetByIdRequest))
        await dispatch(getAllCategories())
    }

    async function handleAddAdditional(productId:string) {
        await dispatch(addComplementaryToCategory({productId, categoryId:currentCategory.id}))
    }

    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        fetchData()
    }, [id])

    async function handleRemoveAdditional(productId:string) {
        await dispatch(removeComplementaryFromCategory({productId, categoryId:currentCategory.id}))
    }
    return (
        <div className={"min-h-screen max-w-full p-4"}>
            <BiArrowBack className={"text-3xl mb-4 mt-4 cursor-pointer"} onClick={() => {
                router.back()
            }}/>
            <div>Назва категорії : {currentCategory.name}</div>
            <div>
                <h3 className={"text-3xl"}>Додаткові товари</h3>
                <div
                    className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4  gap-4 justify-between mt-4`}>
                    {currentCategory.additionals && currentCategory.additionals.map((product)=><ProductCard key={product.id?.toString()} title={product.title} imgName={product.imgName} price={product.price} id={product.id?.toString()} name={product.name}
                                                                                                            customOnClick={()=>{
                                                                                                                handleRemoveAdditional(product.id?.toString())
                                                                                                            }} />)}
                </div>
            </div>
            <div className={""}>
                <span className={"flex grow-0 items-center cursor-pointer bg-yellow-5 p-4 rounded-2xl unselectable font-bold"} onClick={()=>{
                    setEditingAdditionals(prev=>!prev)
                }}>
                    <BiPen className={"text-2xl"}/>
                    <p>Редагувати додаткові товари</p>
                </span>
            </div>
            <div className={`${editingAdditionals ? 'block' : 'hidden'}`}>
                <div className={"flex"}>
                    <div className={"rounded-xl bg-blue-2 flex items-center justify-items-center cursor-pointer"}
                         onClick={() => {
                             handleGetAllProducts()
                         }}>
                            <span className={"text-white text-xl p-3"}>
                                Всі
                            </span>
                    </div>
                    {categoryList.map(category => <CategoryItem key={category.id?.toString()} name={category.name}
                                                                id={category.id} onClick={() => {
                        setCategoryId(category.id)
                        handleGetProductsByCategory()
                    }}/>)}
                </div>
                <div
                    className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4  gap-4 justify-between mt-4`}>
                    {productList && productList.map((product) => <ProductCard id={product.id?.toString() || ""}
                                                                              key={product.id} name={product.name}
                                                                              title={product.title}
                                                                              imgName={product.imgName}
                                                                              price={product.price}
                                                                              customOnClick={()=>{
                                                                                  handleAddAdditional(product.id?.toString())
                                                                              }}
                    />)}
                </div>
                <button onClick={() => {
                    console.log(currentCategory)
                }}>A
                </button>
            </div>
        </div>
    )
}
export default CategoryDetails
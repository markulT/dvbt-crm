import {FC, useEffect, useState} from "react";
import {BiSearch} from "react-icons/bi";
import Paginator from "@/components/Paginator";
import {useAppDispatch, useAppSelector} from "@/store/hooks/redux";
import {createProduct, createShortProduct, getAllProducts} from "@/store/reducers/products/productThunks";
import {$CombinedState} from "redux";
import ProductElement from "@/components/ProductElement";
import {Product, ShortProduct} from "@/store/models/Product";
import {router} from "next/client";
import {FaPlus} from "react-icons/fa";


const ProductPage:FC = () => {

    // це все для пошуку галімого, який тут і не всрався, але хай буде
    const [searchFocused, setSearchFocused] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('')
    const dispatch = useAppDispatch()

    // Список усіх товарів
    const products:Product[] = useAppSelector((state)=>state.product.list)
    // Це кароче хєрня , щоб попап вилізав
    const [create,setCreate] = useState<boolean>(false)



    useEffect(()=>{
        if(!sessionStorage.getItem("accessToken")) {
            router.push("auth/login")
        }
        dispatch(getAllProducts());
    },[])

    //Поля для створення товару
    const [name,setName] = useState<string>('');
    const [title,setTitle] = useState<string>('');
    const [desc ,setDesc] = useState<string>('');
    const [price,setPrice] = useState<number>(0);
    const [imgName, setImgName] = useState<string>('')

    //Створити галімий товар
    async function submitCreate() {
        if(name == '' || title == '' || desc == "" || price == 0 || imgName == '') {
            return
        }
        const product:ShortProduct = {
            imgName: imgName, name: name, price: price, title: title, desc:desc
        }
        await dispatch(createShortProduct(product))
        dispatch(getAllProducts());
    }

    return (
        <div className={'flex-1 min-h-screen min-w-screen p-4'}>
            <div className={"bg-gray-800 w-full p-3 rounded-3xl"}>

                <div className={`flex items-center ${searchFocused ? "outline-amber-50" : "outline-amber-200"}`}>
                    <input className={"p-2 bg-transparent rounded-3xl focus:outline-0"} value={search} onChange={(e)=>{
                        setSearch(e.target.value.toString())
                    }} type="text" placeholder={"Search..."} onFocus={()=>setSearchFocused(true)}/>
                    <BiSearch className={"text-3xl"} />
                    <button className={"justify-self-end rounded-[50%] bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 p-4"} onClick={()=>{setCreate(true)}}>
                        <FaPlus className={"text-l"} />
                    </button>
                    <div className={`h-screen w-screen flex items-center justify-center absolute top-0 left-0 z-10 backdrop-blur-lg ${create ? "visible" : "hidden"}`} onClick={(e) => {
                        // console.log(e.target.closest('div.absolute') == e.target)
                        // setCreate(false)
                        if (e.target.closest('div.absolute') == e.target) setCreate(false)
                    }}>
                        <div className={"flex flex-col items-center px-4 py-8 bg-green-600 rounded-3xl z-30"}>
                            <input className={"p-2 mb-4 color-red-500 bg-gray-800"} type="text" onChange={(e)=>{setName(e.target.value)}} value={name} placeholder={"Айдішна назва товару (сам хз нафіг, але хай буде).."}/>
                            <input className={"p-2 mb-4 color-red-500 bg-gray-800"} type="text" onChange={(e)=>{setTitle(e.target.value)}} value={title} placeholder={"Повна назва товару.."}/>
                            <textarea className={"p-2 mb-4 resize-none color-red-500 bg-gray-800"} onChange={(e)=>{setDesc(e.target.value)}} value={desc} placeholder={"Опис цієї галіматні.."}/>
                            <input className={"p-2 mb-4 color-red-500 bg-gray-800"} type="number" onChange={(e)=>{
                                setPrice(
                                    Number(e.target.value)
                                )
                            }} value={price} placeholder={"Ціна.."}/>
                            <input className={"p-2 mb-4 color-red-500 bg-gray-800"} type="text" onChange={(e)=>{setImgName(e.target.value)}} value={imgName} placeholder={"Тут потім буде картинка(любий текст сюда).."}/>
                            <button onClick={submitCreate} className={"bg-orange-950 rounded-3xl mt-4 p-4"}>Створити</button>
                        </div>

                    </div>
                </div>

                <div className={"mt-4"}>
                    {products ? products.map((product)=><ProductElement key={product.id} name={product.name} title={product.title} price={product.price} imgName={product.imgName} id={product.id?.toString()}/>) : ""}
                </div>

                {/*<Paginator name={"clients"} length={length} pageSize={5}/>*/}

            </div>
        </div>
    )
}
export default ProductPage
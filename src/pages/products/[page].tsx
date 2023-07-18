import {FC, useEffect, useState} from "react";
import {BiSearch} from "react-icons/bi";
import Paginator from "@/components/Paginator";
import {useAppDispatch, useAppSelector} from "@/store/hooks/redux";
import {createProduct, createShortProduct, getAllProducts} from "@/store/reducers/products/productThunks";
import {$CombinedState} from "redux";
import ProductElement from "@/components/ProductElement";
import {Product, ShortProduct} from "@/store/models/Product";

import {FaPlus} from "react-icons/fa";
import TowerElement from "@/components/towers/TowerElement";
import {useRouter} from "next/router";


const ProductPage:FC = () => {
    const router = useRouter()
    const [searchFocused, setSearchFocused] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('')
    const dispatch = useAppDispatch()


    //@ts-ignore
    const products:Product[] = useAppSelector((state)=>state.product.list)
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
        <div className={"flex flex-row bg-white-bg min-h-screen w-screen p-4"}>
            <div className={"flex flex-col w-full"}>
                {/*@ts-ignore*/}
                {products ? products.map((product)=><ProductElement key={product.id} name={product.name} title={product.title} price={product.price} imgName={product.imgName} id={product.id?.toString()}/>) : ""}
            </div>
            {/*<Paginator name={"clients"} length={length} pageSize={5}/>*/}

            <div className={`flex flex-col w-1/3 items-start p-4 ${searchFocused ? "outline-amber-50" : "outline-amber-200"}`}>
                <div className={`flex w-full bg-white p-2 rounded-2xl items-center justify-between`}>
                    <input className={"p-2 w-full bg-transparent text-blue-5 font-medium placeholder-blue-4 focus:outline-0"} value={search}
                           onChange={(e) => {
                               setSearch(e.target.value.toString())
                           }} type="text" placeholder={"Пошук..."} onFocus={() => setSearchFocused(true)}/>
                    <BiSearch className={"text-2xl text-blue-5 m-2 hover:scale-110 hover:text-blue-6 transition-all duration-500"}/>
                </div>


                <div className={`w-full mb-8 h-full items-center justify-center  ${!create ? "visible" : "hidden"}`} onClick={(e) => {
                    // console.log(e.target.closest('div.absolute') == e.target)
                    // setCreate(false)
                    //@ts-ignore
                    if (e.target.closest('div.absolute') == e.target) setCreate(false)
                }}>
                    <div className={"h-full bg-white rounded-3xl "}>
                        <div className="flex flex-col  mt-4 h-2/3 p-4 items-center justify-between py-4 ">
                            <p className={"text-blue-5 font-semibold text-xl"}>Додати товар</p>
                            <input
                                className="p-4 py-4 font-medium rounded-xl text-blue-5 w-full border-blue-5 border-2 placeholder-blue-4 focus:outline-0"
                                type="text"
                                onChange={(e)=>{setName(e.target.value)}} value={name} placeholder={"Айдішна назва товару (сам хз нафіг, але хай буде).."}
                            />
                            <input
                                className="p-4 py-4 font-medium rounded-xl text-blue-5 w-full border-blue-5 border-2 placeholder-blue-4 focus:outline-0"
                                type="text"
                                onChange={(e)=>{setTitle(e.target.value)}} value={title} placeholder={"Повна назва товару.."}
                            />
                            <textarea
                                className="p-4 py-4 font-medium rounded-xl text-blue-5 w-full border-blue-5 border-2 placeholder-blue-4 focus:outline-0"
                                onChange={(e)=>{setDesc(e.target.value)}} value={desc} placeholder={"Опис цієї галіматні.."}
                            />
                            <input
                                className="p-4 py-4 font-medium rounded-xl text-blue-5 w-full border-blue-5 border-2 placeholder-blue-4 focus:outline-0"
                                type="text"
                                onChange={(e)=>{
                                    setPrice(
                                        Number(e.target.value)
                                    )
                                }} value={price} placeholder={"Ціна.."}
                            />
                            <input
                                className="p-4 py-4 font-medium rounded-xl text-blue-5 w-full border-blue-5 border-2 placeholder-blue-4 focus:outline-0"
                                type="text"
                                onChange={(e)=>{setImgName(e.target.value)}} value={imgName} placeholder={"Тут потім буде картинка(любий текст сюда).."}
                            />
                            <button onClick={submitCreate} className="bg-gradient-to-tr from-blue-5 to-blue-4 rounded-2xl p-4 w-full">Створити</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductPage

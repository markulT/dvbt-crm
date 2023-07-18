import {FC, useEffect, useState} from "react";
import {useAppSelector} from "@/store/hooks/redux";
import SearchField from "@/components/SearchField";
import ProductElement from "@/components/ProductElement";
import {router} from "next/client";
import {getAllProducts} from "@/store/reducers/products/productThunks";
import {useDispatch} from "react-redux";
import {Product} from "@/store/models/Product";

interface ProductListProps {
    onProductClick: Function,
}

const ProductList: FC<ProductListProps> = ({onProductClick}) => {

    const productList = useAppSelector((state) => state.product.list)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!sessionStorage.getItem("accessToken")) {
            router.push("auth/login")
        }
        //@ts-ignore
        dispatch(getAllProducts());
    }, [])

    return (

        <div className={"relative z-[101] rounded-3xl bg-gray-800 p-4"}>
            <SearchField/>
            {/*@ts-ignore*/}
            {productList && productList.map(product => <div key={product.id} onClick={() => {
                    onProductClick(product)
                }}><ProductElement
                    name={product.name} title={product.title}
                    price={product.price} imgName={product.imgName}
                //@ts-ignore
                    id={product.id}/></div>
            )}
        </div>

    )
}

export default ProductList
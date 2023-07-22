import {FC, useState} from "react";
import {BiCross, BiPen} from "react-icons/bi";
import {RxCross2} from "react-icons/rx";
import {useAppDispatch} from "@/store/hooks/redux";
import {updateProduct} from "@/store/reducers/products/productThunks";
import {type} from "os";

interface ProductFieldProps {
    title: string,
    value: any,
    name: string,
    id: string,
    refreshCallback:Function,
    castTo?:any
}

const ProductField: FC<ProductFieldProps> = ({title, value, name, id, refreshCallback, castTo}) => {


    const [newValue, setNewValue] = useState<any>(value)
    const dispatch = useAppDispatch()
    const [active, setActive] = useState<boolean>(false)

    async function updateField() {
        if (newValue == value || newValue == '' || name == '') {
            return
        }
        switch (castTo) {
            case "number":
                await dispatch(updateProduct({id: id, field: name, value: Number(newValue)}))
                refreshCallback()
            default:
                await dispatch(updateProduct({id: id, field: name, value: newValue}))
                refreshCallback()
        }
        setActive(false)
    }

    return (
        <div className={""}>
            <h4 className={"text-xl "}>{title}</h4>
            <div className={`flex ${active ? "flex-col" : "flex-row"} gap-2`}>
                <span className={"text-2xl font-bold"}>{value}</span>
                {active ?
                    <div>
                        <div className="w-2/3">
                            <div className="relative h-12 w-full min-w-[200px]">
                                <input
                                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    placeholder="Нове значення"
                                    onChange={(e) => {
                                        setNewValue(e.target.value)
                                    }}/>
                            </div>
                        </div>
                        {/*<input type="text" value={newValue} className={"bg-transparent border-blue-5 w-full p-2"} onChange={(e) => {*/}
                        {/*    setNewValue(e.target.value)*/}
                        {/*}}/>*/}
                        <div className={"mt-4 flex"}>
                            <button className={"w-2/3 bg-blue-5 p-4 text-white rounded-xl"} onClick={updateField}>Submit</button>
                            <button className={"p-4"}>
                                <RxCross2 className={"text-2xl text-blue-5"} onClick={()=>setActive(false)} />
                            </button>
                        </div>
                    </div>
                    :
                    <div className={"flex"}>
                        <BiPen className={"text-yellow-400 text-2xl cursor-pointer"} onClick={() => setActive(true)}/>
                    </div>
                }
            </div>
        </div>
    )
}
export default ProductField

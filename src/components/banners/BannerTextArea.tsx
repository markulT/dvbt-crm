import {FC, useState} from "react";
import {BiCross, BiPen} from "react-icons/bi";
import {useAppDispatch} from "@/store/hooks/redux";
import {updateBanner} from "@/store/reducers/banners/bannerThunks";
import {RxCross2} from "react-icons/rx";

interface BannerTextAreaProps {
    title:string,
    value:any,
    name:string,
    refreshCallback:Function,
    castTo?:any,
    id:string
}

const BannerTextArea:FC<BannerTextAreaProps> = ({title, castTo, refreshCallback, name,value, id}) => {

    const [newValue, setNewValue] = useState<any>(value)
    const dispatch = useAppDispatch()
    const [active, setActive] = useState<boolean>(false)

    async function updateField() {
        if (newValue == value || newValue == '' || name == '') {
            return
        }

        await dispatch(updateBanner({field:name, id:id, value:newValue}))
        refreshCallback()
        setActive(false)
    }

    return (
        <div>
            <h4 className={"text-xl"}>{title}</h4>
            <div className={`flex ${active ? "flex-col" : "flex-row"} gap-2`}>
                <span className={"text-2xl font-bold"}>{value}</span>
                {active ?
                    <div>
                        <textarea
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder="Нове значення"
                            onChange={(e) => {
                                setNewValue(e.target.value)
                            }}/>
                        <div className={"flex"}>
                            <button className={"w-2/3 mt-2 bg-blue-5 p-4 text-white rounded-xl"} onClick={updateField}>Submit</button>
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
export default BannerTextArea

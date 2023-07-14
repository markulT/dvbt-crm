import {FC, useState} from "react";
import {BiCross, BiPen} from "react-icons/bi";
import {useAppDispatch} from "@/store/hooks/redux";
import {updateBanner} from "@/store/reducers/banners/bannerThunks";

interface BannerFieldProps {
    title:string,
    value:any,
    name:string,
    refreshCallback:Function,
    castTo?:any,
    id:string
}

const BannerField:FC<BannerFieldProps> = ({title, castTo, refreshCallback, name,value, id}) => {

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
            <h4 className={"text-3xl font-bold"}>{title}</h4>
            <span>{value}</span>
            {active ?
                <div>
                    <input type="text" value={newValue} className={"bg-transparent"} onChange={(e) => {
                        setNewValue(e.target.value)
                    }}/>
                    <div className={"flex"}>
                        <button className={"bg-green-500 p-4"} onClick={updateField}>Submit</button>
                        <button className={"p-4"}>
                            <BiCross className={"text-2xl text-white"} onClick={()=>setActive(false)} />
                        </button>
                    </div>
                </div>
                :
                <div className={"flex"}>
                    <BiPen className={"text-yellow-400 text-2xl cursor-pointer"} onClick={() => setActive(true)}/>
                </div>
            }
        </div>
    )
}
export default BannerField
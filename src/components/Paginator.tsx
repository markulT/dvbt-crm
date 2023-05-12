import {FC} from "react";
import {BiLeftArrow, BiRightArrow} from "react-icons/bi";
import {useRouter} from "next/router";

interface IPaginatorProps {
    name:string,
    length:number,
    pageSize:number
}

const Paginator:FC<IPaginatorProps> = ({name, length, pageSize}) => {

    const router = useRouter()

    return (
        <div className={"flex"}>
            <BiLeftArrow className={`text-2xl ${router.query.page == 1 ? "hidden" : "visible"} cursor-pointer  `} onClick={()=>{
                router.push(`/${name}/${Number(router.query.page) - 1}`)
            }}/>
            <BiRightArrow className={`text-2xl ${Number(router.query.page) * pageSize > length ? "hidden" : "visible"} cursor-pointer`} onClick={()=>{
                router.push(`/${name}/${Number(router.query.page) + 1}`)
            }} />
        </div>
    )
}
export default Paginator
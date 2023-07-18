import Navbar from "@/components/navbar/Navbar";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {refresh} from "@/store/reducers/authSlice";

//@ts-ignore
export default function Layout({children}) {

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(refresh())
    },[])

    return (
        <div className={"flex bg-red-600"}>
            <Navbar></Navbar>
            {children}
        </div>
    )
}
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks/redux";
import {login, refresh} from "@/store/reducers/authSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store";
import {fetchProducts} from "@/store/reducers/ActionCreators";


export default function Login() {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch()
    // const dispatch = useDispatch<any>()

    function sendLogin() {
        if (email == '' || password == '') {
            return
        }

        // dispatch(fetchProducts())
        dispatch(login({email:email, password:password}))
    }
    function testRefresh() {
        dispatch(refresh({}))
    }

    return (
        <div className={"flex-1 min-h-screen min-w-screen"}>
            <div className={"flex-col min-h-full flex-1 flex items-center justify-center"}>

                <input placeholder={"Login"} className={"grow-0 text-green-950"} type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

                <input placeholder={"Password"} className={"inline-block text-green-950"} type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

                <button onClick={sendLogin}>Send</button>
                <button className={"mt-4"} onClick={testRefresh}>Test</button>
            </div>
        </div>
    )
}
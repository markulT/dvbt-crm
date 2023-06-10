import {useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks/redux";
import {login, refresh} from "@/store/reducers/authSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store";
import {fetchProducts} from "@/store/reducers/ActionCreators";
import Image from "next/image";


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
        dispatch(login({email: email, password: password}))
    }

    function testRefresh() {
        dispatch(refresh({}))
    }

    return (
        <div className={"flex flex-col h-screen bg-white-bg min-w-screen"}>
            <div className={'flex w-full py-16 justify-center'}>
                <h1 className={"text-blue-5 font-semibold text-2xl"}>Вас вітає <a className={"text-blue-5 font-bold text-2xl"}>MYT2</a> CRM</h1>
            </div>
            <div className={"flex-row flex items-center justify-between"}>
                <div className={"flex flex-col w-1/2 justify-center items-center"}>
                    <p className={"text-blue-5 mb-8 text-center font-semibold text-2xl"}>Логін</p>
                    <input
                        className="p-4 w-1/2 py-4 font-medium rounded-xl text-blue-5 placeholder-blue-4 focus:outline-0"
                        type="text" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                        placeholder={"Login"}
                    />
                    <input
                        className="mt-4 p-4 w-1/2 py-4 font-medium rounded-xl text-blue-5 placeholder-blue-4 focus:outline-0"
                        type="password" value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} placeholder={"Password"}
                    />
                    <button onClick={sendLogin}
                            className="mt-4 bg-gradient-to-tr from-blue-5 to-blue-4 rounded-2xl p-4 w-1/2 ">Підтвердити
                    </button>
                    {/*<input placeholder={"Login"} className={"grow-0 text-green-950"} type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>*/}

                    {/*<input placeholder={"Password"} className={"inline-block text-green-950"} type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>*/}

                    {/*<button onClick={sendLogin}>Send</button>*/}
                    {/*<button className={"mt-4 text-blue-5"} onClick={testRefresh}>Test</button>*/}
                </div>
                <div className={'flex w-1/2 h-1/2'}>
                    <div className="flex flex-col justify-center">
                        <div className="relative">
                            <img

                                draggable={false}
                                className="rounded-xl"
                                src="/pers.png"
                                alt="logo"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

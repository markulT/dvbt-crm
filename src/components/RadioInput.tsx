import {FC} from "react";
import {randomUUID} from "crypto";


interface RadioInputProps {
    value:string,
    title:string,
    setValue:Function,
    name:string
}

const RadioInput:FC<RadioInputProps> = ({value, setValue, title, name}) => {
    let random = ''
    if(window!=null) {
         random = window.crypto.randomUUID()
    }
    return (
        <div>
            <input type="radio" name={name} id={random} value={value} onChange={()=>{
                setValue(value)
            }}/>
            <label htmlFor={random}>{title}</label>
        </div>
    )
}
export default RadioInput
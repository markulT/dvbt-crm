import {FC, useState} from "react";


const CreateProduct:FC = () => {

    const [name, setName] = useState<string>();
    const [title, setTitle] = useState<string>();
    const [price, setPrice] = useState<number>();
    const [imgName, setImgName] = useState<string>()
    

    return (
        <div className={"min-w-full min-h-full flex items-center justify-center blur-lg"}>
            <div className={"flex flex-col justify-center items-center"}>

            </div>
        </div>
    )
}
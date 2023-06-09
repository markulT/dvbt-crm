import {FC, useState} from "react";
import {BiSearch} from "react-icons/bi";

interface SearchFieldProps {}

const SearchField:FC<SearchFieldProps> = () => {

    const [search, setSearch] = useState<string>('')
    const [searchFocused, setSearchFocused] = useState<boolean>(false);


    return (
        <div className={`flex w-full items-center bg-white shadow-blue-6 ${searchFocused ? "outline-amber-50" : "outline-amber-200"}`}>
            <input className={"p-2 bg-transparent rounded-3xl focus:outline-0"} value={search}
                   onChange={(e) => {
                       setSearch(e.target.value.toString())
                   }} type="text" placeholder={"Search..."} onFocus={() => setSearchFocused(true)}/>
            <BiSearch className={"text-3xl"}/>
        </div>
    )
}
export default SearchField;

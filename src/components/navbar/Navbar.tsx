import { useRouter } from "next/router";
import { AiOutlineTag, AiOutlineUser } from "react-icons/ai";
import { BiCart, BiShoppingBag } from "react-icons/bi";
import { TbEngine } from "react-icons/tb";
import { FaUserTag } from "react-icons/fa";
import { RiGroupLine, RiListUnordered } from "react-icons/ri";
import { AiOutlineTool } from "react-icons/ai";
import { VscRadioTower } from "react-icons/vsc";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks/redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Navbar() {
    const router = useRouter();
    const email = useAppSelector((state) => state.auth.email);

    const [isExpanded, setIsExpanded] = useState(false);

    const { pathname } = router;

    const mainColor = "blue-5";

    function goTo(url: string) {
        router.push(`/${url}`);
    }

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        console.log(pathname);
    }, [pathname]);

    const navItems = [
        {
            Icon: AiOutlineUser,
            text: email ? email : "Not logined",
            path: "",
            url: "",
        },
        {
            Icon: RiGroupLine,
            text: "Клієнти",
            path: "clients/[page]",
            url: "clients/1",
        },
        {
            Icon: RiListUnordered,
            text: "Категорії",
            path: "category",
            url: "category",
        },
        {
            Icon: AiOutlineTool,
            text: "Інсталлятори",
            path: "engineers/[page]",
            url: "engineers/1",
        },
        {
            Icon: VscRadioTower,
            text: "DVBT передатчики",
            path: "towers",
            url: "towers",
        },
        {
            Icon: BiShoppingBag,
            text: "Товари",
            path: "products/[page]",
            url: "products/1",
        },
        {
            Icon: BiCart,
            text: "Замовлення",
            path: "orders/[page]",
            url: "orders/1",
        },
        {
            Icon: FaUserTag,
            text: "Авторизація",
            path: "auth/login",
            url: "auth/login",
        },
    ];

    return (
        <div
            className={`flex bg-white  shadow-2xl shadow-blue-6 justify-center ${
                isExpanded ? "w-1/6" : "w-1/12"
            } transition-all`}
        >
            <div className="InnerFlexBox py-10 flex flex-col justify-center gap-y-10">
                {isExpanded ? (
                    <div className="relative p-[5%]" onClick={handleClick}>
                        <Image
                            draggable={false}
                            className="rounded-xl"
                            layout="fill"
                            objectFit="contain"
                            src="/logo-no-background.png"
                            alt="logo"
                        />
                    </div>
                ) : (
                    <div className="relative p-[5%]" onClick={handleClick}>
                        <Image
                            draggable={false}
                            className="rounded-xl"
                            layout="fill"
                            objectFit="contain"
                            src="/logo-small.png"
                            alt="logo"
                        />
                    </div>
                )}

                {navItems.map((item, index) => (
                    <div
                        key={index}
                        className={`pl-4 pr-4 text-${mainColor} flex items-center ${pathname === `/${item.path}` ? `bg-${mainColor} p-4 cursor-pointer rounded-2xl text-white-bg transition-all duration-500`
                                : ""
                        } ${isExpanded ? "" : "justify-center"} transition-all duration-500`}
                        onClick={() => index !== 0 ? goTo(item.url) : ''}
                    >
                        <item.Icon
                            className={`text-3xl ${isExpanded ? "mr-2" : ""}`}
                        />
                        {isExpanded && (
                            <p className="text-xl cursor-pointer font-medium">{item.text}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

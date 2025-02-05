
import toast from "react-hot-toast";
import { NavLink } from "react-router"
import Button from "./ui/Button";
import { useState } from "react";

const storageKey = "loggedInUser"
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;
console.log("##### XX", userData);


const Navbar = () => {
    const [isLoading, setIsLoading] = useState(false);

    // ** Handlers
    const onLogout = () => {
        localStorage.removeItem(storageKey)

        toast.success("LogOUT completely!", {
            position: "bottom-center",
            duration: 1500,
            style: {
                backgroundColor: "green",
                color: "white",
                width: "fit-content"
            },
        });

        setTimeout(() => {
            location.replace("/login");
        }, 2000)

        setIsLoading(true)
    }


    return (
        <nav className="container bg-[#5046E6] p-6 font-semibold text-white text-xl sm:text-2xl mt-8 rounded shadow-2xl">
            <ul className="flex justify-between items-center">
                <li><NavLink to={"/"}> Home </NavLink></li>
                <div className="flex space-x-5 sm:space-x-10">
                    {
                        userData ? <div className="text-[17px] flex items-center space-x-4">
                            <p><NavLink to={"/todos"} > Todos </NavLink></p>
                            <p><NavLink to={"/profile"} > Profile </NavLink></p>
                            <Button isLoading={isLoading} width="w-fit" className="bg-white text-[black!important] py-[4px!important] sm:py-1 sm:px-3 hover:text-[white!important] hover:bg-red-600 duration-300" onClick={onLogout}>
                                {isLoading ? "Loading" : "Logout"}
                            </Button>
                        </div> : <>
                            <li><NavLink to={"/register"} > Register </NavLink></li>
                            <li><NavLink to={"/login"} > Login </NavLink></li>
                        </>
                    }

                </div>
            </ul>
        </nav>
    )
}

export default Navbar
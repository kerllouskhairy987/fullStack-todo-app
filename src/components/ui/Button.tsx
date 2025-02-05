import { ButtonHTMLAttributes, ReactNode } from "react"
import { ButtonType } from "../../types";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    width: "w-fit" | "w-full";
    isLoading?: boolean;
    className?: string;
    type?: ButtonType;
}

const Button = ({ type, width = "w-full", className, isLoading, children, ...rest }: IProps) => {
    return (
        <button
        type={type}
            className={`${className} bg-[#5046E6] py-4 px-3 sm:p-5 font-medium text-xl text-white outline-none rounded hover:shadow-2xl active:scale-95 
                ${width} flex justify-center items-center disabled:bg-indigo-400 disabled:hover:bg-indigo-400 disabled:cursor-not-allowed`}

            disabled={isLoading}
            {...rest}>

            {isLoading ? <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : null}
            {children}

        </button>
    )
}

export default Button
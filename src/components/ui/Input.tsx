import { forwardRef, InputHTMLAttributes, Ref } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    type: string;
    placeholder?: string;
    className?: string
}

const Input = forwardRef(({ type, placeholder, className, ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
    return (
        <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={`w-full p-4 border rounded shadow-md focus:border-2 focus:border-indigo-500 outline-none  ${className}`}
            {...rest}
        />
    )
})

export default Input
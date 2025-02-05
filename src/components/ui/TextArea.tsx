import { TextareaHTMLAttributes } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    placeholder?: string;
}

function TextArea({ className, placeholder, ...rest }: IProps) {
    return (
        <textarea
            name="textArea"
            placeholder={placeholder}
            className={`w-full h-36 focus:border-2 shadow-md focus:border-indigo-500 outline-none rounded resize-none py-2 px-4 ${className}`}
            {...rest}
        />
    )
}

export default TextArea;

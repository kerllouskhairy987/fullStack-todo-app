interface IProps {
    msg?: string;
}

const ErrorMessage = ({ msg }: IProps) => {
    return msg? <span className="text-red-600 text-sm">{msg}</span> : null;
}

export default ErrorMessage;
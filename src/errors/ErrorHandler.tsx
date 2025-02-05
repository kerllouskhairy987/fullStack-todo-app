import { MdError } from "react-icons/md";
import { Link, useLocation } from "react-router";

interface IProps {
    statusCode?: number;
    title?: string;
}

const ErrorHandler = ({ statusCode = 500, title = "Internal Server ERROR" }: IProps) => {
    const {pathname, search} = useLocation();
    
    return (
        <div className="flex justify-center items-center min-h-[100vh] flex-col text-center">
            <h2 className="w-28 h-28 rounded-full p-3 bg-white text-red-700 flex items-center justify-center text-9xl"><MdError /></h2>
            <h2 className="text-5xl font-bold my-10">{statusCode} - {title}</h2>
            <p className="text-lg font-medium">Oops something went wrong, Try to refresh this page or feel free to content us if this problem still</p>

            <div className="flex items-center space-x-10 mt-10">

                <Link
                    to={"/"}
                    reloadDocument
                    className="bg-red-500 py-2 px-4 text-white rounded"
                    >
                    Home
                </Link>

                <Link 
                        to={pathname}
                        reloadDocument
                        className="bg-red-500 py-2 px-4 text-white rounded"
                    >
                    Refresh
                </Link>

            </div>

        </div>
    )
}

export default ErrorHandler;
import { ReactNode } from "react";
import { Navigate } from "react-router";

interface IProps {
    isAllowed: boolean;
    children: ReactNode;
    redirectPath: string;
    data?: unknown;
}

const ProtectedRoute = ({ isAllowed, children, redirectPath, data }: IProps) => {

    if (!isAllowed) return <Navigate to={redirectPath} replace state={data} />

    return children

}

export default ProtectedRoute;
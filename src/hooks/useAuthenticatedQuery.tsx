import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axios.config";
import { AxiosRequestConfig } from "axios";

interface IAuthenticatedQuery {
    queryKey: string[];
    url: string;
    config?: AxiosRequestConfig;
}

const useAuthenticatedQuery = ({queryKey, url, config}: IAuthenticatedQuery) => {
    return (
        useQuery({
            // ** response.data.todos === data
            queryKey, // queryKey: queryKey
            queryFn: async () => {
                const response = await axiosInstance.get(url, config)
                return response.data;
            }
        })
    )
}

export default useAuthenticatedQuery;
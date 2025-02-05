import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import { SubmitHandler, useForm } from "react-hook-form"
import { LoginSchema } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOGIN_FORM } from "../data";
import ErrorMessage from "../components/ui/ErrorMessage";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
import { Link } from "react-router";


interface IFormInput {
    identifier: string;
    password: string;
}

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(LoginSchema),
    })

    // ** Handlers
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data)
        // Loading
        setIsLoading(true)

        try {
            // Resolved ==> Success
            const { status, data: resData } = await axiosInstance.post("/auth/local", data, {
                timeout: 2000,
            })
            console.log(resData);

            if (status === 200) {
                toast.success('Your Login Is Completed, Will Navigate To Home Page After 2 Seconds !', {
                    position: "bottom-center",
                    duration: 1500,
                    style: {
                        backgroundColor: "green",
                        color: "white",
                        width: "fit-content"
                    },
                });
            }

            // Sava Data IN Local Storage 
            localStorage.setItem("loggedInUser", JSON.stringify(resData));

            setTimeout(() => {
                location.replace("/")
            }, 2000)

        } catch (error) {
            // Rejected
            console.log("error", error);

            const errorObj = error as AxiosError<IErrorResponse>;
            console.log(errorObj.response?.data.error.message);
            toast.error(`${errorObj.response?.data.error.message}`, {
                position: "bottom-center",
                duration: 1500,
                style: {
                    backgroundColor: "red",
                    color: "white",
                    width: "fit-content"
                },
            });

        } finally {
            setIsLoading(false);
        }
    }

    console.log(errors);



    // ** Renders
    const renderLoginForm = LOGIN_FORM.map(({ name, placeholder, type, validation }, idx) => (
        <div key={idx}>
            <Input
                type={type}
                {...register(name, validation)}
                placeholder={placeholder}
            />

            {errors[name] && <ErrorMessage msg={errors[name]?.message} />}
        </div>

    ))

    return (
        <div className="max-w-[550px] mx-auto mt-10 sm:mt-28 flex flex-col border border-indigo-700 p-10 rounded-md">
            <h2 className="text-center font-medium text-xl sm:text-2xl my-5 ">Login to get access!</h2>
            <form className="flex flex-col space-y-5" onSubmit={handleSubmit(onSubmit)}>

                {renderLoginForm}

                <Button width="w-full" isLoading={isLoading}>{isLoading ? "Loading ..." : "Login"}</Button>
                <hr />
                <div className="flex items-center justify-center space-x-2">
                    <span className="text-black">You need to</span>
                    <Link to={"/forget-password"} className="text-center text-indigo-700">Reset Password ?</Link>
                </div>

            </form>
        </div>
    )
}

export default Login;
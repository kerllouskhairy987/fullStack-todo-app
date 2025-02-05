import { useForm, SubmitHandler } from "react-hook-form"
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import ErrorMessage from "../components/ui/ErrorMessage";
import { REGISTER_FORM } from "../data";
import { registerSchema } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup"
import axiosInstance from "../config/axios.config";
import { useState } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
import { useNavigate } from "react-router";

interface IFormInput {
    username: string;
    email: string;
    password: string;
}

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(registerSchema),
    })

    // ** Handlers
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log("data", data)
        // ** Loading
        setIsLoading(true)

        try {
            // ** Fullfil == Success ==> (Optional)
            const { status } = await axiosInstance.post("/auth/local/register", data, {
                timeout: 20000,
            })

            if (status === 200) {
                toast.success('Your Account Is Created, Will Navigate To Logon Page After 2 Seconds !', {
                    position: "bottom-center",
                    duration: 1500,
                    style: {
                        backgroundColor: "green",
                        color: "white",
                        width: "fit-content"
                    },
                });
            }

            setTimeout(() => {
                navigate("/login")
            }, 2000)

        } catch (error) {
            // ** Rejected == Error ==> (Optional)
            console.log("Total Error Is Here ", error);

            const errorObj = error as AxiosError<IErrorResponse>
            console.log("error is here ", errorObj.response?.data.error.message);

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
            setIsLoading(false)
        }
    }

    console.log(errors);

    // ** Renders
    const renderRegisterForm = REGISTER_FORM.map(({ name, placeholder, type, validation }, idx) => (
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
            <h2 className="text-center font-medium text-xl sm:text-2xl my-5 ">Register to get access!</h2>
            <form className="flex flex-col space-y-5" onSubmit={handleSubmit(onSubmit)}>

                {renderRegisterForm}

                <Button width="w-full" isLoading={isLoading}>
                    {isLoading ? "Loading ..." : "Register"}
                </Button>
            </form>
        </div>
    )
}

export default Register;








/* 
toast.error("Your Username OR Email Is Already Exist In Our Database !!!", {
                position: "bottom-center",
                duration: 4000,
                style: {
                    backgroundColor: "red",
                    color: "white",
                },
            });
*/



/*

                <div>
                    <Input
                        type="text"
                        {...register("username", { required: true, minLength: 5 })}
                        placeholder="Enter username ..."
                    />

                    {errors?.username && errors.username.type === "required" && <ErrorMessage msg="Username is required" />}
                    {errors?.username && errors.username.type === "minLength" && <ErrorMessage msg="Username should be at-least 5 chars" />}
                </div>

                <div>
                    <Input
                        type="email"
                        {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/ })}
                        placeholder="Enter address ..."
                    />

                    {errors?.email && errors.email.type === "required" && <ErrorMessage msg="Email is required" />}
                    {errors?.email && errors.email.type === "pattern" && <ErrorMessage msg="Not valid email" />}
                </div>

                <div>
                    <Input
                        type="password"
                        {...register("password", { required: true, minLength: 6 })}
                        placeholder="Enter password ..."
                    />

                    {errors?.password && errors.password.type === "required" && <ErrorMessage msg="Password is required" />}
                    {errors?.password && errors.password.type === "minLength" && <ErrorMessage msg="Password should be at-least 6 chars" />}
                </div>

*/
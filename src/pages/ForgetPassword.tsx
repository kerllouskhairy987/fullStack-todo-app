import Button from "../components/ui/Button";
import ErrorMessage from "../components/ui/ErrorMessage";
import Input from "../components/ui/Input"
import { FORGET_PASSWORD } from "../data";
import { forgetPasswordSchema } from "../validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axiosInstance from "../config/axios.config";
import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";


interface IFormInput {
    identifier: string;
}

const ForgetPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    // ** Handlers
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(forgetPasswordSchema),
    })

    // const onSubmit = (data) => console.log(data);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log("DATA", data)
        console.log("state ", email);

        // Loading
        setIsLoading(true)

        try {
            setEmail(data.identifier)
            const response: AxiosResponse = await axiosInstance.post('/auth/forgot-password', {
                email: "f9b0b32dad@emailawb.pro"
            });

            console.log('Your user received an email', response);
        } catch (error) {
            const errorObj = error as AxiosError;
            console.log('An error occurred:', errorObj.response?.data);
        } finally {
            setIsLoading(false)
        }

        // try {
        //     // Resolved ==> Success
        //     // isForgetEmail()
        //     const { status, data: resData } = await axiosInstance.post('/auth/forgot-password', {
        //         // email: data.identifier,
        //         email: "data@data.com"
        //     }, { timeout: 5000, });
        //     console.log("RES DATA", resData);

        //     if (status === 200 && resData.ok) {
        //         toast.success('Your Email Is Valid !', {
        //             position: "bottom-center",
        //             duration: 1500,
        //             style: {
        //                 backgroundColor: "green",
        //                 color: "white",
        //                 width: "fit-content"
        //             },
        //         });
        //     }

        //     // Sava Data IN Local Storage 
        //     localStorage.setItem("loggedInUser", JSON.stringify(resData));



        // } catch (error) {
        //     // Rejected
        //     console.log("error", error);

        //     const errorObj = error as AxiosError<IErrorResponse>;
        //     console.log(errorObj.response?.data.error.message);
        //     toast.error(`${errorObj.response?.data.error.message}`, {
        //         position: "bottom-center",
        //         duration: 1500,
        //         style: {
        //             backgroundColor: "red",
        //             color: "white",
        //             width: "fit-content"
        //         },
        //     });

        // } finally {
        //     setIsLoading(false);
        // }
    }

    // ** Renders
    const renderForgetPassword = FORGET_PASSWORD.map(({ name, placeholder, type, validation }, idx) => (
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
            <h2 className="text-center font-medium text-xl sm:text-2xl my-5 ">Reset Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                {renderForgetPassword}

                <Button width="w-full" isLoading={isLoading}>{isLoading ? "Loading ..." : "Reset Password"}</Button>
            </form>
        </div>
    )
}

export default ForgetPassword




// // setTimeout(() => {
// //     location.replace("/forget-password-form")
// // }, 2000)


// import Button from "../components/ui/Button";
// import ErrorMessage from "../components/ui/ErrorMessage";
// import Input from "../components/ui/Input";
// import { FORGET_PASSWORD } from "../data";
// import { forgetPasswordSchema } from "../validation";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import axiosInstance from "../config/axios.config";
// import { useState } from "react";
// import { AxiosError, AxiosResponse } from "axios";

// interface IFormInput {
//     identifier: string;
// }

// const ForgetPassword = () => {
//     const [isLoading, setIsLoading] = useState(false);

//     // ** Handlers
//     const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
//         resolver: yupResolver(forgetPasswordSchema),
//     });

//     const onSubmit: SubmitHandler<IFormInput> = async (data) => {
//         console.log("DATA", data);
//         setIsLoading(true);

//         try {
//             const response: AxiosResponse = await axiosInstance.post('/auth/forgot-password', {
//                 email: data.identifier, // هنا بنستخدم الـ identifier اللي هو الإيميل
//             });

//             console.log('Your user received an email', response);
//         } catch (error) {
//             const errorObj = error as AxiosError;
//             console.log('An error occurred:', errorObj.response?.data);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // ** Renders
//     const renderForgetPassword = FORGET_PASSWORD.map(({ placeholder, type, validation }, idx) => (
//         <div key={idx}>
//             <Input
//                 type={type}
//                 {...register("identifier", validation)} // غير name لـ identifier
//                 placeholder={placeholder}
//             />

//             {errors.identifier && <ErrorMessage msg={errors.identifier?.message} />}
//         </div>
//     ));

//     return (
//         <div className="max-w-[550px] mx-auto mt-10 sm:mt-28 flex flex-col border border-indigo-700 p-10 rounded-md">
//             <h2 className="text-center font-medium text-xl sm:text-2xl my-5">Reset Password</h2>
//             <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
//                 {renderForgetPassword}

//                 <Button width="w-full" isLoading={isLoading}>
//                     {isLoading ? "Loading ..." : "Reset Password"}
//                 </Button>
//             </form>
//         </div>
//     );
// };

// export default ForgetPassword;
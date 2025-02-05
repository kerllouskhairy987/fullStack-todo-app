import * as yup from "yup"

export const registerSchema = yup
    .object({
        username: yup.string().required("username is required!").min(5, "Must be greater than 5 chars"),
        email: yup.string().required("Email is required!").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/, "Email not valid"),
        password: yup.string().required("Password is required!").min(6, "Must be more than 6 chars")
    })
    .required()


export const LoginSchema = yup
    .object({
        identifier: yup.string().required("Email is required!").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/, "Email not valid"),
        password: yup.string().required("Password is required!").min(6, "Must be more than 6 chars")
    })
    .required()


export const forgetPasswordSchema = yup
    .object({
        identifier: yup.string().required("Email is required!").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/, "Email not valid"),
    })
    .required()
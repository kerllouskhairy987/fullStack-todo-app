import { IForgetPassword, ILoginInput, IRegisterInput } from "../interfaces";

export const REGISTER_FORM: IRegisterInput[] = [
    {
        name: "username",
        placeholder: "Username",
        type: "text",
        validation: {
            required: true,
            minLength: 5
        }
    },

    {
        name: "email",
        placeholder: "Email",
        type: "email",
        validation: {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
        }
    },

    {
        name: "password",
        placeholder: "Password",
        type: "password",
        validation: {
            required: true,
            minLength: 6
        }
    },
]

export const LOGIN_FORM: ILoginInput[] = [
    {
        name: "identifier",
        placeholder: "Email",
        type: "email",
        validation: {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
        }
    },
    {
        name: "password",
        placeholder: "Password",
        type: "password",
        validation: {
            required: true,
            minLength: 6,
        }
    }
]

export const FORGET_PASSWORD: IForgetPassword[] = [
    {
        name: "identifier",
        placeholder: "Email",
        type: "email",
        validation: {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
        }
    }
]

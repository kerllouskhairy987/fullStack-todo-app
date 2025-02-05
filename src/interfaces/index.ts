import { RegisterInput } from "../types"
// Interface For Register
export interface IRegisterInput {
    name: RegisterInput,
    placeholder: string,
    type: string,
    validation: {
        required?: boolean,
        minLength?: number,
        pattern?: RegExp
    }
}

// Interface For Login
export interface ILoginInput {
    name: "identifier" | "password",
    placeholder: string;
    type: string;
    validation: {
        required: boolean;
        minLength?: number;
        pattern?: RegExp;
    }
}

// Interface For Forget Password
export interface IForgetPassword {
    name: "identifier" ,
    placeholder: string;
    type: string;
    validation: {
        required: boolean;
        minLength?: number;
        pattern?: RegExp;
    }
}

export interface IErrorResponse {
    error: {
        details?: {
            errors: {
                message :string;
            }[],
        };

        message?: string;
    }
}

export interface ITodo {
    id?: number;
    documentId: string;
    title: string;
    description: string;
}
import { PrismaClient } from "@prisma/client"

export interface ValidationReturn{
    error: boolean,
    message: string,
    data: string | number
}

export async function emailUnique(email: string){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isValidEmail = re.test(String(email).toLowerCase());

    if(!isValidEmail){
        return {
            data: email,
            error: true,
            message: "email format is not valid"
        }
    }

    const prisma = new PrismaClient()

    const emailUniq = await prisma.user.findFirst({
        where: {
            email
        }
    })

    
    if(emailUniq){
        return {
            data: email,
            error: true,
            message: "email have been used"
        }
    }
    return {
        data: email,
        error: false,
        message: "email is unique"
    }
}

function validateLength({
    name,
    data,
    minLength,
    maxLength,
}: {
    name: string;
    data: string;
    minLength?: number;
    maxLength?: number;
}): ValidationReturn | null {
    if (minLength && data.length < minLength) {
        return {
            error: true,
            message: `${name} Should Be Longer Than ${minLength} characters`,
            data,
        };
    }

    if (maxLength && data.length > maxLength) {
        return {
            error: true,
            message: `${name} Should Be Less Than ${maxLength} characters`,
            data,
        };
    }

    return null;
}

export function validation({
    name,
    data,
    required,
    minLength,
    maxLength,
}: {
    name: string;
    data: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
}): ValidationReturn {
    // Handle 'required' validation
    if (required && (data === '' || data === undefined || data === null)) {
        return {
            error: true,
            message: `${name} Is Required`,
            data,
        };
    }

    // Convert number data to string for uniform validation
    const dataString = typeof data === 'number' ? data.toString() : data;

    // Perform length validation for string/number
    const lengthValidation = validateLength({
        name,
        data: dataString,
        minLength,
        maxLength,
    });

    if (lengthValidation) {
        return lengthValidation;
    }

    // Return valid response if all checks pass
    return {
        error: false,
        message: `${name} is Valid`,
        data,
    };
}
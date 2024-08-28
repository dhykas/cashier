import { PrismaClient } from "@prisma/client"

export interface ValidationReturn{
    error: boolean,
    message: string,
    data: string
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

export function validation({
    name,
    minLength,
    maxLength,
    data,
    required,
}:{
    name: string,
    data:string,
    required?: boolean,
    minLength?: number,
    maxLength?: number,
}) : ValidationReturn
{
    if(required && !data){
        return {
            error: true,
            message: name+" Is Required",
            data
        }

    }

    if(minLength && data.length < minLength){
        return {
            error: true,
            message: name+" Should Be Longer Than "+minLength,
            data
        }
    }

    if(maxLength && data.length > maxLength){
        return {
            error: true,
            message: name+" Should Be Less Than "+maxLength,
            data
        }
    }

    return {
        error: false,
        message: name+" is Valid",
        data
    }

};
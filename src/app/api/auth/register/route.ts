import { emailUnique, validation, ValidationReturn,  } from "@/utils/validation";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest){
    const prisma = new PrismaClient()

    const formData = await req.formData();

    interface objdata{
        email: string,
        password: string,
        username: string,
    }

    const objData:objdata = Object.fromEntries(formData) as unknown as objdata;

    const email: ValidationReturn = validation({
        data: objData.email,
        name: "email",
        required: true,
        minLength: 13
    })
    
    const password: ValidationReturn = validation({
        data: objData.password,
        name: "password",
        required: true,
        minLength: 8,
        maxLength: 28
    });

    const username: ValidationReturn = validation({
        data: objData.username,
        name: "username",
        required: true,
        minLength: 5,
        maxLength: 20
    });

    if(email.error){
        return NextResponse.json(email)
    }

    const uniqEmail = await emailUnique(email.data)

    if(uniqEmail.error){
        return NextResponse.json(uniqEmail, {
            status: 400
        })
    }

    if(username.error){
        return NextResponse.json(username)
    }

    if(password.error){
        return NextResponse.json(password)
    }

    const newUser = await prisma.user.create({
        data: {
            email: objData.email,
            password: bcrypt.hashSync(objData.password, 10),
            username: objData.username,
        }
    })

    return NextResponse.json({
        error: false,
        message: 'New User Have Been Created',
        newUser
    }, {
        status: 201
    });
}
import { validation, ValidationReturn } from "@/utils/validation";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest){
    const prisma = new PrismaClient()
    const formData = await req.formData();
    const secret_key = process.env.JWT_SECRET as string;

    interface objdata{
        email: string,
        password: string,   
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

    const user = await prisma.user.findFirst({
        where: {
            email: objData.email
        }
    })
        const isPass = await bcrypt.compare(objData.password, user!.password)
        if(!isPass){
            return NextResponse.json({
                data: password.data,
                error: true,
                message: "invalid password"
            }, {
                status: 400
            })
        }
        console.log(isPass)

    if(email.error){
        return NextResponse.json(email, {
            status: 400
        })
    }
    if(password.error){
        return NextResponse.json(password, {
            status: 400
        })
    }

    const token = jwt.sign({ user }, secret_key, {
        expiresIn: '7h'
    })
    
    console.log(token)

    return NextResponse.json({
        error: false,
        message: "login successfull",
        token
    });
}
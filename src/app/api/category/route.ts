'use server'
import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";
import getUser from "@/utils/getUserByToken";
import { validation } from "@/utils/validation";

const prisma = new PrismaClient();
export async function GET(req: NextRequest){
    const token = req.headers.get('authorization');

    const user = getUser(token!)

    const allCategory = await prisma.productCategory.findMany({
        where: {
            UserId: user.id
        }
    });

    return NextResponse.json({
        error: false,
        message: "successfully get all category",
        allCategory
    });

}

export async function POST(req: NextRequest){
    const formData = await req.formData();
    
    const token = req.headers.get('authorization');
    const user = getUser(token!)

    interface objdata{
        name: string,
    }

    const objData:objdata = Object.fromEntries(formData) as unknown as objdata;

    const name = validation({
        data: objData.name,
        name:"name",
        required: true
    })

    if(name.error){
        return NextResponse.json(name, {
            status: 400
        });
    }

    const newCategory = await prisma.productCategory.create({
        data: {
            name: name.data,
            UserId: user.id
        }
    });

    return NextResponse.json({
        error: false,
        message: "successfully created new category",
        newCategory,
    });
    
}
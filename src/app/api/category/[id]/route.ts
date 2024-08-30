import getUser from "@/utils/getUserByToken";
import { validation } from "@/utils/validation";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params } : { params: { id: number } }){
    const { id } = params
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

    const editedCategory = await prisma.productCategory.update({
        where: {
            id: id,
            userId: user.id
        },
        data:{
            name: name.data as string
        }
    });

    return NextResponse.json({
        error: false,
        message: "successfully edited category",
        editedCategory
    })
}

export async function DELETE(req: NextRequest, { params } : { params: { id: string } }){
    const { id } = params
    
    const token = req.headers.get('authorization');
    const user = getUser(token!)

    const deletedCategory = await prisma.productCategory.delete({
        where: {
            id: parseInt(id) as number,
            userId: user.id
        },
    });

    return NextResponse.json({
        error: false,
        message: "successfuly deleted category",
        deletedCategory
    });
}
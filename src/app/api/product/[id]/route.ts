import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";
import { validation } from "@/utils/validation";
import getUser from "@/utils/getUserByToken";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params } : { params: { id: string } }){
    const { id } = params
    const formData = await req.formData();

    console.log(typeof id)


    const token = req.headers.get('authorization');
    const user = getUser(token!);

    interface objdata{
        name: string,
        stock: number,   
        price: number,   
        categoryId: number,   
    }

    const objData:objdata = Object.fromEntries(formData) as unknown as objdata;

    const name = validation({
        name: "name",
        data: objData.name,
        required: true
    })
    
    if(name.error){
        console.log('lah ko eror')
        return NextResponse.json(name, {
            status: 400
        });
    }

    const stock = validation({
        name: "stock",
        data: objData.stock,
        required: true
    })

    if(stock.error){
        return NextResponse.json(stock, {
            status: 400
        });
    }

    const price = validation({
        name: "price",
        data: objData.price,
        required: true
    })

    if(price.error){
        return NextResponse.json(price, {
            status: 400
        });
    }

    const categoryId = validation({
        name: "categoryId",
        data: objData.categoryId,
        required: true
    })

    if(categoryId.error){
        return NextResponse.json(categoryId, {
            status: 400
        });
    }

    const editedProduct = await prisma.product.update({
        where: {
            id: parseInt(id),
            userId: user.id
        },
        data: {
            name: name.data as string,
            price: parseInt(price.data as string),
            stock: parseInt(stock.data as string),
            categoryId: parseInt(categoryId.data as string),
            userId: user.id
        }
    });

    
    return NextResponse.json({
        error: false,
        message: "successfully edit new product",
        editedProduct
    })
}


export async function DELETE(req: NextRequest, { params } : { params: { id: string } }){
    const { id } = params
    
    const token = req.headers.get('authorization');
    const user = getUser(token!)

    const deletedCategory = await prisma.product.delete({
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
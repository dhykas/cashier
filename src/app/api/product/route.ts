import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";
import { validation } from "@/utils/validation";
import getUser from "@/utils/getUserByToken";

const prisma = new PrismaClient();

export async function GET(req: NextRequest){
    const token = req.headers.get('authorization');
    const user = getUser(token!);

    const allProd = await prisma.product.findMany({
        where: {
            userId: user.id
        }
    });

    return NextResponse.json({
        error: false,
        message: "successfully get all product",
        allProd
    })
}

export async function POST(req: NextRequest){
    const formData = await req.formData();

    const token = req.headers.get('authorization');
    const user = getUser(token!)

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

    const newProduct = await prisma.product.create({
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
        message: "successfully add new product",
        newProduct
    })
}

export async function DELETE(req: NextRequest, { params } : { params: { id: number } }){
    const { id } = params
    
    const token = req.headers.get('authorization');
    const user = getUser(token!)

    const deletedProduct = await prisma.product.delete({
        where: {
            id: id,
            userId: user.id
        },
    });

    return NextResponse.json({
        error: false,
        message: "successfuly deleted category",
        deletedProduct
    });
}
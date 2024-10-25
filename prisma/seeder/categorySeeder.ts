import { PrismaClient } from "@prisma/client";

export default async function categorySeeder(){
    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst()

    if (!user) {
        throw new Error("No user found, unable to seed products");
    }

    const userid = user.id

    const data= [];
    for (let i = 1; i <= 5; i++) {
        data.push({
            userId: userid,            
            name: `categories ${i}`
        });
    }
    
    const addCategory = await prisma.productCategory.createMany({
        data: data
    })
}
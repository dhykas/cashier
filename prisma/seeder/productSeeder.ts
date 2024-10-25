import { PrismaClient, Product } from "@prisma/client";

export default async function productSeeder(){
    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst();
    const category = await prisma.productCategory.findFirst();

    if (!user) {
        throw new Error("No user found, unable to seed products");
    }

    if (!category) {
        throw new Error("No product category found, unable to seed products");
    }

    const userid = user.id
    const categoryid = category.id

    const data = [];
    for (let i = 1; i <= 5; i++) {
        data.push({
            name: `product ${i}`,
            price: 2000,
            stock: 2,
            userId: userid,
            categoryId: categoryid    
        });
    }
    
    const addProduct = await prisma.product.createMany({
        data: data
    })
}
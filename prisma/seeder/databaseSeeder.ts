import { PrismaClient } from "@prisma/client";
import userSeeder from "./userSeeder";

async function clearDatabase(){
    const prisma = new PrismaClient();

    await prisma.productCategory.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
}

clearDatabase()
userSeeder();

console.log("database seed successfully!")
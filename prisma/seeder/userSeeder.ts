import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export default async function userSeeder(){
    const prisma = new PrismaClient();

    const checkAdmin = await prisma.user.findFirst({
        where: {
            email: "admin@gmail.com"
        }
    })

    if (checkAdmin){
        await prisma.user.delete({
            where: {
                email: "admin@gmail.com"
            }
        })
    }

    console.log(checkAdmin)
    const admin = await prisma.user.create({
        data: {
            email: "admin@gmail.com",
            password: bcrypt.hashSync("password", 10),
            username: "admin"
        }
    });

    return admin
}
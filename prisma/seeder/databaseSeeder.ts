import { PrismaClient } from "@prisma/client";
import userSeeder from "./userSeeder";
import categorySeeder from "./categorySeeder";
import productSeeder from "./productSeeder";

const prisma = new PrismaClient();
async function clearDatabase() {

    // Count records in each table
    const productCount = await prisma.product.count();
    const productCategoryCount = await prisma.productCategory.count();
    const userCount = await prisma.user.count();

    if (productCount > 0 || productCategoryCount > 0 || userCount > 0) {
        // If any table has data, perform the deletion
        await prisma.product.deleteMany();
        await prisma.productCategory.deleteMany();
        await prisma.user.deleteMany();
        
        console.log("Database cleared successfully");
    } else {
        console.log("No data to clear");
    }

    await prisma.$disconnect();
}

async function runSeeders() {
    try {
        await clearDatabase()
        await userSeeder();            
        await categorySeeder();  
        await productSeeder();   
        console.log("All seeders completed");
    } catch (error) {
        console.error("Error running seeders:", error);
    } finally {
        await prisma.$disconnect();
    }
}

runSeeders();
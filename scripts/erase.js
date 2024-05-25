import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function clearDatabase() {
  try {
    // Delete records in the order of dependency resolution
    await prisma.trip.deleteMany({});
    await prisma.busDocument.deleteMany({});
    await prisma.driverDocument.deleteMany({});
    await prisma.bus.deleteMany({});
    await prisma.driver.deleteMany({});
    await prisma.user.deleteMany({});

    console.log("All data cleared from the database.");
  } catch (error) {
    console.error("Failed to clear database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase();

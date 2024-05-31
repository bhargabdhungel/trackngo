import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function clearDatabase() {
  try {
    const allDriverDoc = await prisma.driverDocument.findMany({});
    const allBusDoc = await prisma.busDocument.findMany({});

    console.log("Deleting all data from the database...");

    await Promise.all(
      allDriverDoc.map(async (doc) => {
        const publicId = doc.link.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      })
    );

    await Promise.all(
      allBusDoc.map(async (doc) => {
        const publicId = doc.link.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      })
    );

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

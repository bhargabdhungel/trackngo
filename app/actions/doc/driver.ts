"use server";
import { DriverDocumentType } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/prisma/db";
import authCheck from "../auth/authCheck";

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadFile(
  base64Data: string,
  driverId: number,
  type: DriverDocumentType,
  expiryDate: Date
) {
  try {
    const user = await authCheck();
    // check if the driver exists and the the driver id belongs to the user
    const driver = await prisma.driver.findUnique({
      where: {
        id: driverId,
        userId: user.userId,
      },
    });
    if (!driver) {
      return {
        success: false,
        message: "Driver not found",
      };
    }

    const uploadResult = await cloudinary.uploader.upload(base64Data, {
      resource_type: "image",
    });
    const link = uploadResult.secure_url;

    // Delete all duplicates of the document

    const dublicates = await prisma.driverDocument.findMany({
      where: {
        driverId,
        type,
      },
    });

    await prisma.driverDocument.deleteMany({
      where: {
        driverId,
        type,
      },
    });

    // delete all duplicates from the cloudinary

    await Promise.all(
      dublicates.map(async (doc) => {
        const publicId = doc.link?.split("/").pop();
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      })
    );

    await prisma.driverDocument.create({
      data: {
        driverId,
        link,
        type,
        expiryDate,
      },
    });

    return {
      success: true,
      message: "Document uploaded successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error uploading document",
    };
  }
}

export async function deleteFile(id: number) {
  try {
    const user = await authCheck();

    // verify if the document belongs to the user
    const document = await prisma.driverDocument.findUnique({
      where: {
        id,
      },
    });

    if (!document) {
      return {
        success: false,
        message: "Document not found",
      };
    }

    const driver = await prisma.driver.findUnique({
      where: {
        id: document.driverId,
      },
    });

    if (!driver || driver.userId !== user.userId) {
      return {
        success: false,
        message: "Document not found",
      };
    }

    const publicId = document.link?.split("/").pop();
    if (!publicId) {
      return {
        success: false,
        message: "Document not found",
      };
    }
    await cloudinary.uploader.destroy(publicId);

    await prisma.driverDocument.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      message: "Document deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error deleting the document",
    };
  }
}

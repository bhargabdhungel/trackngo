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

    // Check for existing documents of the same type and delete them
    const existingDocuments = await prisma.driverDocument.findMany({
      where: {
        driverId,
        type,
      },
    });

    await Promise.all(
      existingDocuments.map(async (doc) => {
        const publicId = doc.link.split("/").pop();
        await cloudinary.uploader.destroy(publicId!);
        await prisma.driverDocument.delete({
          where: { id: doc.id },
        });
      })
    );

    const uploadResult = await cloudinary.uploader.upload(base64Data, {
      resource_type: "image",
    });

    const newDocument = await prisma.driverDocument.create({
      data: {
        driverId,
        link: uploadResult.secure_url,
        type,
        expiryDate,
      },
    });

    return {
      success: true,
      message: "Document uploaded successfully",
      data: newDocument,
    };
  } catch (error) {
    console.error("Error uploading document:", error);
    return {
      success: false,
      message: "Error uploading document",
    };
  }
}

async function deleteFile(id: number) {
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
    console.error("Error deleting document:", error);
    return {
      success: false,
      message: "Error deleting the document",
    };
  }
}

"use server";
import { BusDocumentType } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/prisma/db";
import authCheck from "../auth/authCheck";

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload Base64 encoded file
async function uploadFile(
  base64Data: string,
  busId: number,
  type: BusDocumentType,
  expiryDate: Date
) {
  try {
    const user = await authCheck();

    const vehicle = await prisma.bus.findUnique({
      where: {
        id: busId,
        userId: user.userId,
      },
    });

    if (!vehicle) {
      return {
        success: false,
        message: "Vehicle not found",
      };
    }

    const uploadResult = await cloudinary.uploader.upload(base64Data, {
      resource_type: "image",
    });
    const link = uploadResult.secure_url;

    // Delete all duplicates of the document
    const dublicates = await prisma.busDocument.findMany({
      where: {
        busId,
        type,
      },
    });

    await prisma.busDocument.deleteMany({
      where: {
        busId,
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

    await prisma.busDocument.create({
      data: {
        busId,
        link,
        type: type,
        expiryDate,
      },
    });

    return {
      success: true,
      message: "File uploaded successfully",
    };
  } catch (error) {
    console.error("Upload failed:", error);
    return {
      success: false,
      message: "Error uploading file",
    };
  }
}

async function deleteFile(busDocumentId: number) {
  try {
    const user = await authCheck();

    const busDocument = await prisma.busDocument.findUnique({
      where: {
        id: busDocumentId,
      },
    });

    if (!busDocument) {
      return {
        success: false,
        message: "Document not found",
      };
    }

    const bus = await prisma.bus.findUnique({
      where: {
        id: busDocument.busId,
      },
    });

    if (!bus || bus.userId !== user.userId) {
      return {
        success: false,
        message: "Document not found",
      };
    }

    // Extract the public_id from the Cloudinary URL
    const publicId = busDocument.link?.split("/").pop();
    if (!publicId) {
      return {
        success: false,
        message: "Error deleting the document",
      };
    }
    await cloudinary.uploader.destroy(publicId);

    // Delete the document from the database
    await prisma.busDocument.delete({
      where: {
        id: busDocumentId,
      },
    });

    return {
      success: true,
      message: "Document deleted successfully",
    };
  } catch (error) {
    console.error("Deletion failed:", error);
    return {
      success: false,
      message: "Error deleting the document",
    };
  }
}

export { uploadFile, deleteFile };

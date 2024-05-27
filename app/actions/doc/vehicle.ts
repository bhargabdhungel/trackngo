"use server";
import { BusDocumentType, DriverDocumentType } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/prisma/db";

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
    const uploadResult = await cloudinary.uploader.upload(base64Data, {
      resource_type: "image",
    });
    const link = uploadResult.secure_url;

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

// Function to delete file both from Cloudinary and the database
async function deleteFile(busDocumentId: number) {
  try {
    // Retrieve the document from the database
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

    // Extract the public_id from the Cloudinary URL
    const publicId = busDocument.link?.split("/").pop();
    if (!publicId) {
      return {
        success: false,
        message: "Error deleting the document",
      };
    }

    // Delete the file from Cloudinary
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

export { deleteFile };

export { uploadFile };

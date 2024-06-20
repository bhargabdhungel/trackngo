"use server";
import { BusDocumentType } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/prisma/db";
import authCheck from "../auth/authCheck";
import { VehicleDocument } from "@/lib/types";

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadVehicleDocument(
  base64Data: string,
  vehicleId: number,
  type: BusDocumentType,
  expiryDate: Date
) {
  try {
    // check if the user is logged in and has permission to upload documents
    const user = await authCheck();
    const vehicle = await prisma.bus.findUnique({
      where: {
        id: vehicleId,
        userId: user.userId,
      },
    });
    if (!vehicle)
      return {
        success: false,
        message: "Vehicle not found",
      };

    // Check for existing document of the same type and delete it
    const existingDocument = await prisma.busDocument.findFirst({
      where: {
        busId: vehicleId,
        type,
      },
    });
    if (existingDocument) {
      const publicId = existingDocument.link?.split("/").pop();
      if (publicId) await cloudinary.uploader.destroy(publicId);
      await prisma.busDocument.delete({
        where: { id: existingDocument.id },
      });
    }

    // create a new document record
    const uploadResult = await cloudinary.uploader.upload(base64Data, {
      resource_type: "image",
    });
    const newDocument: VehicleDocument = await prisma.busDocument.create({
      data: {
        busId: vehicleId,
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
    return {
      success: false,
      message: "Error uploading document",
    };
  }
}

export async function deleteVehicleDocument(id: number) {
  try {
    // check if the user is logged in
    const user = await authCheck();

    // find the document
    const document = await prisma.busDocument.findFirst({
      where: {
        id: id,
      },
    });
    if (!document)
      return {
        success: false,
        message: "Document not found",
      };

    // check if the user is the owner of the vehicle
    const vehicle = await prisma.bus.findUnique({
      where: {
        id: document.busId,
        userId: user.userId,
      },
    });
    if (!vehicle) {
      return {
        success: false,
        message: "Invalid operation",
      };
    }

    // delete the document from the database
    const publicId = document.link?.split("/").pop();
    if (publicId) await cloudinary.uploader.destroy(publicId);
    await prisma.busDocument.delete({
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

export async function deleteAllDocsByVehicleId(id: number) {
  try {
    // check if the user is logged in
    const user = await authCheck();

    // check if the user is the owner of the vehicle
    const vehicle = await prisma.bus.findUnique({
      where: {
        id: id,
        userId: user.userId,
      },
    });
    if (!vehicle) throw new Error("Invalid operation");

    // get all documents for the vehicle
    const documents = await prisma.busDocument.findMany({
      where: {
        busId: id,
      },
    });

    // delete all documents
    await Promise.all(
      documents.map(async (document) => {
        try {
          const publicId = document.link?.split("/").pop();
          if (!publicId) {
            return {
              success: false,
              message: "Document not found",
            };
          }

          // Deleting the file from Cloudinary
          await cloudinary.uploader.destroy(publicId);

          // Deleting the document record from the database
          await prisma.busDocument.delete({
            where: {
              id: document.id,
            },
          });
        } catch (error) {
          throw new Error("Error deleting documents");
        }
      })
    );
  } catch (error) {
    throw error;
  }
}

import { v2 as cloudinary } from "cloudinary";
import axios from "axios";
import getUserServer from "@/hooks/useAuthServer";
import prisma from "@/prisma/db";
import { BusDocumentType } from "@prisma/client";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload File to Cloudinary and get the link
export default async function uploadFileToCloudinary(
  file: File,
  filename: string,
  type: BusDocumentType,
  busId: number,
  expiryDate: Date
) {
  try {
    const formData = new FormData();
    formData.append("file", file, filename);
    formData.append("upload_preset", "mbptyl5f");

    // Upload to Cloudinary
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        cloudinary.config().cloud_name
      }/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // return response.data.secure_url;

    // save the image url to the database

    const token = await getUserServer();
    const email = token.email as string;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        userId: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
        description: "Please login to create add a vehicle",
      };
    }

    await prisma.busDocument.create({
      data: {
        expiryDate: expiryDate,
        link: response.data.secure_url,
        type: type,
        busId: busId,
      },
    });
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    return null;
  }
}

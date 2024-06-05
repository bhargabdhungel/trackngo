"use server";
import prisma from "@/prisma/db";

export default async function deleteTrip(id: number) {
  try {
    await prisma.trip.delete({
      where: {
        id,
      },
    });
    return {
      success: true,
      message: "Trip deleted",
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "Error deleting trip",
    };
  }
}

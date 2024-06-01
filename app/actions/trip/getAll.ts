"use server";
import authCheck from "../auth/authCheck";
import prisma from "@/prisma/db";

export default async function getAllTrips() {
  const user = await authCheck();
  try {
    const trips = await prisma.trip.findMany({
      where: {
        userId: user.userId,
      },
    });
    return {
      success: true,
      message: "Trips fetched successfully",
      data: trips,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch trips",
      description: JSON.stringify(error),
    };
  }
}

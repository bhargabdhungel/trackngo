"use server";
import authCheck from "../auth/authCheck";
import prisma from "@/prisma/db";

export default async function getAllTrips({
  startDate = new Date("2024-01-01"),
  endDate = new Date(),
  driverId = null,
  vehicleId = null,
}: {
  startDate: Date;
  endDate: Date;
  driverId?: number | null;
  vehicleId?: number | null;
}) {
  if (!startDate || !endDate) {
    return {
      success: false,
      message: "Start date and end date are required",
    };
  }
  const user = await authCheck();
  if (!user) {
    return {
      success: false,
      message: "User authentication failed",
    };
  }
  try {
    const whereClause = {
      userId: user.userId,
      startTime: {
        gte: startDate,
        lte: endDate,
      },
      ...(driverId !== null && { driverId }),
      ...(vehicleId !== null && { vehicleId }),
    };

    const trips = await prisma.trip.findMany({
      where: whereClause,
      orderBy: {
        startTime: "desc",
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

"use server";
import { Trip } from "@/lib/types";
import authCheck from "../auth/authCheck";
import prisma from "@/prisma/db";

export default async function getAllTrips({
  startDate = new Date("1024-01-01"),
  endDate = new Date("3024-01-01"),
  driverId = null,
  vehicleId = null,
}: {
  startDate?: Date | null;
  endDate?: Date | null;
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
  try {
    const whereClause: {
      userId: number;
      startTime: {
        gte: Date;
        lte: Date;
      };
      driverId?: number;
      busId?: number;
    } = {
      userId: user.userId,
      startTime: {
        gte: startDate,
        lte: endDate,
      },
    };

    if (driverId !== null) {
      whereClause.driverId = driverId;
    }

    if (vehicleId !== null) {
      whereClause.busId = vehicleId;
    }

    const trips: Trip[] = await prisma.trip.findMany({
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
    console.log(error);
    return {
      success: false,
      message: "Failed to fetch trips",
      description: JSON.stringify(error),
    };
  }
}

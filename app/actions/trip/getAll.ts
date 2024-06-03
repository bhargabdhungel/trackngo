"use server";
import authCheck from "../auth/authCheck";
import prisma from "@/prisma/db";

export default async function getAllTrips({
  startDate = new Date("2024-01-01"),
  endDate = new Date(),
  page = 1,
}: {
  startDate: Date;
  endDate: Date;
  page: number;
}) {
  if (!startDate || !endDate) {
    return {
      success: false,
      message: "Start date and end date are required",
    };
  }
  const user = await authCheck();
  try {
    // Fetch trips for the user within the specified date range 30 values per page
    const trips = await prisma.trip.findMany({
      where: {
        userId: user.userId,
        startTime: {
          gte: startDate,
          lte: endDate,
        },
      },
      take: 30,
      skip: (page - 1) * 30,
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

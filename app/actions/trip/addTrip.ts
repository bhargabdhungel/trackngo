"use server";

import getUserServer from "@/hooks/useAuthServer";
import prisma from "@/prisma/db";

export default async function addTrip(
  busId: number,
  driverId: number,
  routeFrom: string,
  routeTo: string,
  startTime: Date,
  endTime: Date,
  fare: number,
  maintenanceCost: number
) {
  const token = await getUserServer();
  const email = token.email as string;

  routeFrom = routeFrom.toLowerCase().trim();
  routeTo = routeTo.toLowerCase().trim();

  // Checks if the user is logged in
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
      description: "Please login to add a trip",
    };
  }

  await prisma.trip.create({
    data: {
      busId: busId,
      driverId: driverId,
      userId: user.userId,
      routeFrom: routeFrom,
      routeTo: routeTo,
      startTime: startTime,
      endTime: endTime,
      fare: fare,
      maintenanceCost: maintenanceCost,
    },
  });

  return {
    success: true,
    message: "Vehicle created successfully",
    description: `Trip from ${routeFrom} to ${routeTo} has been created`,
  };
}

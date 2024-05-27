"use server";

import getUserServer from "@/hooks/useAuthServer";
import prisma from "@/prisma/db";

export default async function getAllTrips() {
  const token = await getUserServer();
  const email = token.email as string;

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
}

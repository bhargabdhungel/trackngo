"use server";
import { Trip } from "@/lib/types";
import prisma from "@/prisma/db";

export default async function updateTrip(trip: Trip) {
  try {
    await prisma.trip.update({
      where: {
        id: trip.id,
      },
      data: trip,
    });
    return {
      success: true,
      message: "Trip updated successfully",
      data: trip,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update trip",
      description: JSON.stringify(error),
    };
  }
}

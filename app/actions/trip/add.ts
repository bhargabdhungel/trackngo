"use server";
import { Trip } from "@/lib/types";
import prisma from "@/prisma/db";
import authCheck from "../auth/authCheck";

export default async function addTrip(trip: Trip) {
  const user = await authCheck();
  console.log(user);
  console.log(trip);
  if (user.userId !== trip.userId) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    await prisma.trip.create({
      data: trip,
    });
    return {
      success: true,
      message: "Trip added successfully",
      data: trip,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to add trip",
      description: JSON.stringify(error),
    };
  }
}

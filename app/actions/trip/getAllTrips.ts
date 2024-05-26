"use server";

import prisma from "@/prisma/db";

export default async function getAllTrips() {
  const trips = await prisma.trip.findMany();
  return trips;
}

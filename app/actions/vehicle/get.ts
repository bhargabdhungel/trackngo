"use server";
import prisma from "@/prisma/db";
import authCheck from "../auth/authCheck";

export default async function getVehicleWithId(id: number) {
  const user = await authCheck();

  const bus = await prisma.bus.findUnique({
    where: {
      id: id,
      userId: user.userId,
    },
    select: {
      id: true,
      name: true,
      userId: true,
      documents: true,
    },
  });

  if (!bus) {
    return {
      success: false,
      message: "Vehicle not found",
      description: "Vehicle does not exist",
    };
  }

  return {
    success: true,
    message: "Vehicle fetched",
    data: bus,
  };
}

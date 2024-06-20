"use server";

import prisma from "@/prisma/db";
import authCheck from "../auth/authCheck";
import { Vehicle } from "@/lib/types";

export default async function getAllVehicles() {
  const user = await authCheck();
  const buses: Vehicle[] = await prisma.bus.findMany({
    where: {
      userId: user.userId,
    },
    include: {
      documents: true,
    },
  });
  return {
    success: true,
    message: "Vehicles fetched",
    data: buses,
  };
}

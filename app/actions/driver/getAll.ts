"use server";

import prisma from "@/prisma/db";
import authCheck from "../auth/authCheck";
import { Driver } from "@/lib/types";

async function getAllDrivers() {
  const user = await authCheck();
  const drivers: Driver[] = await prisma.driver.findMany({
    where: {
      userId: user.userId,
    },
    include: {
      documents: true,
    },
  });
  return {
    success: true,
    message: "Drivers fetched successfully",
    data: drivers,
  };
}

getAllDrivers.uniqueId = "getAllDrivers";
export default getAllDrivers;

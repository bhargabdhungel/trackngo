"use server";

import prisma from "@/prisma/db";
import authCheck from "../auth/authCheck";

export default async function getAllDrivers() {
  const user = await authCheck();
  const drivers = await prisma.driver.findMany({
    where: {
      userId: user.userId,
    },
  });
  return {
    success: true,
    message: "Drivers fetched successfully",
    data: drivers,
  };
}

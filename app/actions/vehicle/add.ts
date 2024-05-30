"use server";
import prisma from "@/prisma/db";
import authCheck from "../auth/authCheck";

export default async function addVehicle(vehiclename: string) {
  const user = await authCheck();
  vehiclename = vehiclename.trim().toUpperCase();
  const vehicleExists = await prisma.bus.findUnique({
    where: {
      name: vehiclename,
    },
    select: {
      id: true,
    },
  });

  if (vehicleExists) {
    return {
      success: false,
      message: "Vehicle already exists",
      description: "Please enter a different vehicle name",
    };
  }

  const vehicle = await prisma.bus.create({
    data: {
      name: vehiclename,
      userId: user.userId,
    },
    select: {
      id: true,
      name: true,
      userId: true,
      documents: true,
    },
  });

  return {
    success: true,
    message: "Vehicle created successfully",
    description: `Vehicle ${vehiclename} has been created`,
    data: vehicle,
  };
}

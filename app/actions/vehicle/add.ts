"use server";
import prisma from "@/prisma/db";
import authCheck from "../auth/authCheck";
import { Vehicle } from "@/lib/types";

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

  const vehicle: Vehicle = await prisma.bus.create({
    data: {
      name: vehiclename,
      userId: user.userId,
    },
    include: {
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

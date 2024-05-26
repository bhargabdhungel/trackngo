"use server";

import VehicleWithId from "@/app/(client)/vehicle/[id]/page";
import getUserServer from "@/hooks/useAuthServer";
import prisma from "@/prisma/db";

export default async function addVehicle(vehiclename: string) {
  const token = await getUserServer();
  const email = token.email as string;

  vehiclename = vehiclename.trim().toUpperCase();

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
      description: "Please login to create add a vehicle",
    };
  }

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

  const bus = await prisma.bus.create({
    data: {
      name: vehiclename,
      userId: user.userId,
    },
  });

  return {
    success: true,
    message: "Vehicle created successfully",
    description: `Vehicle ${vehiclename} has been created`,
  };
}

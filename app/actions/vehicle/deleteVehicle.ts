"use server";

import prisma from "@/prisma/db";
import authCheck from "../auth/authCheck";
import { deleteAllDocsByVehicleId } from "../doc/vehicle";

export default async function deleteVehicle(id: number) {
  const user = await authCheck();

  try {
    // Delete all vehicle docs
    deleteAllDocsByVehicleId(id);

    // Delete all trips
    await prisma.trip.deleteMany({
      where: {
        busId: id,
        userId: user.userId,
      },
    });

    // Delete the vehicle
    await prisma.bus.delete({
      where: {
        id: id,
        userId: user.userId,
      },
    });
    return {
      success: true,
      message: "Vehicle deleted successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error deleting vehicle",
    };
  }
}

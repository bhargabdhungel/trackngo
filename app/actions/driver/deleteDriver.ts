"use server";

import prisma from "@/prisma/db";
import authCheck from "../auth/authCheck";
import { deleteAllDocsByDriverId } from "../doc/driver";

export default async function deleteDriver(id: number) {
  const user = await authCheck();

  try {
    // Delete the documents
    await deleteAllDocsByDriverId(id);

    // Delete the trips
    await prisma.trip.deleteMany({
      where: {
        driverId: id,
        userId: user.userId,
      },
    });

    // Delete the driver
    await prisma.driver.delete({
      where: {
        id: id,
        userId: user.userId,
      },
    });
    return {
      success: true,
      message: "Driver deleted successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error deleting driver",
    };
  }
}

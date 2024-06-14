"use server"

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
            }
        })

        // Delete the driver
        await prisma.driver.delete({
            where: {
                id: id,
            },
        });

        return {
            success: true,
            message: "Trip deleted"
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Error deleting driver",
        };
    }
}
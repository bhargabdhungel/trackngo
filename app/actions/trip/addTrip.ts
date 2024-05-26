"use server"

import getUserServer from "@/hooks/useAuthServer";
import prisma from "@/prisma/db"

export default async function addTrip(
    busId: number,
    driverId: number,
    routeFrom: string,
    routeTo: string,
    startTime: Date,
    endTime: Date,
    fare: number,
    maintenanceCost: number
) {
    const token = await getUserServer();
    const email = token.email as string;

    routeFrom = routeFrom.toLowerCase().trim();
    routeTo = routeTo.toLowerCase().trim();

    // Checks if the user is logged in
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
            description: "Please login to add a trip",
        };
    }

    // Checks if the bus exists
    // const bus = await prisma.bus.findUnique({
    //     where: {
    //         id: busId,
    //     },
    // });

    // if (!bus) {
    //     return {
    //         success: false,
    //         message: "Bus does not exist!",
    //         description: `Sorry, the trip cannot be added, the bus does not exist`,
    //     };
    // }

    // Creates a trip
    await prisma.trip.create({
        data: {
            busId: busId,
            driverId: driverId,
            routeFrom: routeFrom,
            routeTo: routeTo,
            startTime: startTime,
            endTime: endTime,
            fare: fare,
            maintenanceCost: maintenanceCost
        }
    })

    return {
        success: true,
        message: "Vehicle created successfully",
        description: `Trip from ${routeFrom} to ${routeTo} has been created`,
    };
}
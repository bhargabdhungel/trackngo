"use server"

import prisma from "@/prisma/db";

export default async function getUserFromDB ({id} : {id : number}) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                userId: id,
            }
        })

        return {
            success: true,
            message: "User data fetched successfully",
            data: user
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Error fetching user",
            data: null
        }
    }
}
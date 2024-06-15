"use server"

import prisma from "@/prisma/db";

export default async function updateUsername(id: number, name: string) {
    try {
        await prisma.user.update({
            where: { userId: id },
            data: { name: name }
        })

        return {
            message: "Username updated successfully",
            success: true
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Error updating user",
        };
    }
}
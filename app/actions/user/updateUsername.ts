"use server";

import prisma from "@/prisma/db";
import authCheck from "../auth/authCheck";

export default async function updateName(name: string) {
  try {
    const user = await authCheck();
    const updatedUser = await prisma.user.update({
      where: { userId: user.userId },
      data: { name: name },
    });

    return {
      success: true,
      message: "Username updated successfully",
      data: updatedUser,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error updating user",
      data: null,
    };
  }
}

"use server";

import prisma from "@/prisma/db";
import authCheck from "../auth/authCheck";
import { User } from "@/lib/types";

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
      data: updatedUser as User,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error updating user",
    };
  }
}

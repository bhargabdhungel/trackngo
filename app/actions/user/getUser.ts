"use server";

import prisma from "@/prisma/db";
import authCheck from "../auth/authCheck";

export default async function getUserFromDB() {
  const userData = await authCheck();
  try {
    const user = await prisma.user.findFirst({
      where: {
        userId: userData.userId,
      },
    });

    return {
      success: true,
      message: "User data fetched successfully",
      data: user,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error fetching user",
      data: null,
    };
  }
}

"use server";

import prisma from "@/prisma/db";
import authCheck from "../auth/authCheck";
import { User } from "@/lib/types";

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
      data: user as User,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error fetching user",
    };
  }
}

"use server";
import getUserServer from "@/hooks/useAuthServer";
import prisma from "@/prisma/db";

export default async function get(id: number) {
  const token = await getUserServer();
  const email = token.email as string;

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
      description: "Please login to get the vehicle info",
    };
  }

  const bus = await prisma.bus.findUnique({
    where: {
      id: id,
      userId: user.userId,
    },
    select: {
      name: true,
      id: true,
      documents: true,
    },
  });

  if (!bus) {
    return {
      success: false,
      message: "Vehicle not found",
      description: "Vehicle does not exist",
    };
  }

  return {
    success: true,
    data: bus,
  };
}

"use server";

import getUserServer from "@/hooks/useAuthServer";
import prisma from "@/prisma/db";

export default async function getAllVehicles() {
  const token = await getUserServer();
  const email = token.email as string;

  // console.log(email, "email")
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if(!user) {
    return [];
  }

  const buses = await prisma.bus.findMany({
    where: {
      userId: user?.userId
    }
  })

  return buses;
}

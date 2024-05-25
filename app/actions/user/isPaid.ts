"use server";
import getUserServer from "@/hooks/useAuthServer";
import prisma from "@/prisma/db";

export default async function isPaidUser() {
  const token = await getUserServer();
  const email = token.email as string;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) return false;
  return user.paid;
}

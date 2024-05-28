"use server";
import getUserServer from "@/hooks/useAuthServer";
import prisma from "@/prisma/db";
import { redirect } from "next/navigation";

export default async function authCheck() {
  const token = await getUserServer();
  if (!token.email) redirect("/");
  const user = await prisma.user.findUnique({
    where: {
      email: token.email,
    },
  });
  if (!user) redirect("/");
  return user;
}

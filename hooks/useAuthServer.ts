import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { User } from "@/lib/types";

export default async function getUserServer() {
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!user) redirect("/");
  return user;
}

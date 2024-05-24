import { useSession } from "next-auth/react";
import { User } from "@/lib/types";

export default function useAuthClient() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  if (loading) return { loading, userData: null };
  else {
    const user: User = session?.user as User;
    return { loading, userData: user };
  }
}

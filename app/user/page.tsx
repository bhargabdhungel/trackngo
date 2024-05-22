"use client";
import { redirect } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function UserPage(): JSX.Element {
  const { user, signOut } = useAuth();
  if (!user) {
    redirect("/");
  }
  const image: string = user.image as string;
  console.log(user);
  return (
    <div>
      <div>hello {user.name}</div>
      <Button className="bg-primary" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

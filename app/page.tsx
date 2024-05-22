"use client";
import { redirect } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/toggle-theme";

export default function HomePage(): JSX.Element {
  const { loading, user, signIn, signOut } = useAuth();
  if (loading) return <div>loading...</div>;
  if (user) {
    redirect("/user");
  }
  return (
    <div>
      <div>hello world</div>
      <Button onClick={signIn}>Sign In</Button>
      <ModeToggle />
    </div>
  );
}

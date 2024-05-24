"use client";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export default function ButtonSignOut({
  className,
}: {
  className?: string;
}): JSX.Element {
  return <Button onClick={() => signOut()}>Sign Out</Button>;
}

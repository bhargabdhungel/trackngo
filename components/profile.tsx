"use client";
import { UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useAuthClient from "@/hooks/useAuthClient";

export default function Profile() {
  const { userData } = useAuthClient();
  return (
    <Avatar className="cursor-pointer">
      <AvatarImage src={userData?.image} alt={userData?.name} />
      <AvatarFallback>
        <UserRound />
      </AvatarFallback>
    </Avatar>
  );
}

"use client";
import { LogOutIcon } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={() => {
        signOut();
      }}
    >
      <LogOutIcon className="mr-2 h-4 w-4" />
      <span>Log Out</span>
    </DropdownMenuItem>
  );
}

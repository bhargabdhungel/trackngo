"use client";
import { LogOutIcon } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={() => {
        signOut({
          redirect: false,
        });
        router.replace("/");
      }}
    >
      <LogOutIcon className="mr-2 h-4 w-4" />
      <span>Log Out</span>
    </DropdownMenuItem>
  );
}

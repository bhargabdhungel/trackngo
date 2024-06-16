"use client";
import {
  Eye,
  // Github,
  // LifeBuoy,
  // Mail,
  // MessageSquare,
  Plus,
  User,
  // PlusCircle,
  // Settings,
  // User,
  // UserCheckIcon,
  // UserPlus,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ModeToggle from "./toggle-theme";
// import Logout from "./dropdown/logout";
import { useRouter } from "next/navigation";
import useAuthClient from "@/hooks/useAuthClient";
import Loading from "@/app/loading";

export default function DropdownMenuProfile() {
  const { loading, userData } = useAuthClient();
  const router = useRouter();
  if (loading) return <Loading />;
  if (!loading && !userData) router.replace("/");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={userData?.image} alt={userData?.name} />
          <AvatarFallback>user</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* profile */}
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push("/profile")}
            className="cursor-pointer"
          >
            <User className="mr-2 h-4 w-4" />
            <span className="text-xl">profile</span>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem> */}
          <DropdownMenuItem>
            <ModeToggle />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* add */}
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/vehicle/addnew")}>
            <Plus className="mr-2 h-4 w-4" />
            <span className="text-xl">add new vehicle</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/driver/addnew")}>
            <Plus className="mr-2 h-4 w-4" />
            <span className="text-xl">add new driver</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/trip/add")}>
            <Plus className="mr-2 h-4 w-4" />
            <span className="text-xl">add new trip</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* view */}
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/vehicle")}>
            <Eye className="mr-2 h-4 w-4" />
            <span className="text-xl">view vehicles</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/driver")}>
            <Eye className="mr-2 h-4 w-4" />
            <span className="text-xl">view drivers</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/trip")}>
            <Eye className="mr-2 h-4 w-4" />
            <span className="text-xl">view trips</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* extra */}
        <DropdownMenuGroup>
          {/* <DropdownMenuItem>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem disabled className="">
            <UserCheckIcon className="mr-2 h-4 w-4" />
            <span>Admin</span>
          </DropdownMenuItem> */}
          {/* <Logout /> */}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

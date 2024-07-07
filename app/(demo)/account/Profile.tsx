"use client";

import Loading from "@/app/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import useAuthClient from "@/hooks/useAuthClient";
import { PersonIcon } from "@radix-ui/react-icons";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import updateName from "@/app/actions/user/updateUsername";
import { toast } from "@/components/ui/use-toast";
import getUserFromDB from "@/app/actions/user/getUser";
import useData from "@/hooks/useData";
import EditableText from "@/components/Editable";

export default function Profile() {
  const { loading, userData } = useAuthClient();
  const {
    data: user,
    isLoading,
    mutate,
  } = useData(getUserFromDB, "getUserFromDB");

  const handleSave = async (name: string) => {
    try {
      const res = await updateName(name);
      if (res.success) {
        toast({ title: "Username updated successfully" });
        mutate({
          success: true,
          message: "Success",
          description: "Username updated successfully",
          data: res.data,
        });
      } else {
        toast({ title: "Error while updating" });
      }
    } catch (e) {
      console.error(e);
      toast({ title: "Internal Server Error" });
    } finally {
    }
  };

  if (loading || isLoading) return <Loading />;
  if (!userData || !user) return null;

  return (
    <div className="w-full h-[calc(100vh-112px)] flex items-center justify-center p-4">
      <Card className="w-1/2 max-md:w-full h-3/4 rounded-3xl flex flex-col select-none justify-center">
        <CardContent className="h-3/4 flex flex-col justify-center items-center relative pt-12">
          <Avatar
            className="h-28 w-28 -mt-16 dark:border-white border-black border-4 cursor-pointer"
            onClick={() => alert("Coming soon")}
          >
            <AvatarImage
              src={user.image as string}
              alt="Profile Image"
              className="object-cover"
            />
            <AvatarFallback>
              <PersonIcon className="h-full w-full" />
            </AvatarFallback>
          </Avatar>
          <EditableText
            initialValue={user.name as string}
            placeholder="Enter your name"
            className="text-2xl mt-4"
            onSave={(value) => {
              handleSave(value as string);
            }}
          />
          <p className="text-sm mt-4">{userData?.email}</p>
        </CardContent>
      </Card>
    </div>
  );
}

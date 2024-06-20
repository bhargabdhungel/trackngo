"use client";

import Loading from "@/app/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import useAuthClient from "@/hooks/useAuthClient";
import { PersonIcon } from "@radix-ui/react-icons";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import updateName from "@/app/actions/user/updateUsername";
import { toast } from "@/components/ui/use-toast";
import getUserFromDB from "@/app/actions/user/getUser";
import useData from "@/hooks/useData";

export default function Profile() {
  const { loading, userData } = useAuthClient();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [updating, setUpdating] = useState(false);
  const {
    data: user,
    isLoading,
    mutate,
  } = useData(getUserFromDB, "getUserFromDB");

  if (loading || isLoading) return <Loading />;
  if (!userData || !user) return null;

  const handleSave = async () => {
    setEditMode(false);
    setUpdating(true);
    try {
      const res = await updateName(name);
      if (res.success) {
        toast({ title: "Success" });
        mutate({
          success: true,
          message: "Success",
          description: "Username updated successfully",
          data: {
            ...user,
            name: name,
          },
        });
      } else {
        toast({ title: "Error while updating" });
      }
    } catch (e) {
      console.error(e);
      toast({ title: "Internal Server Error" });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-112px)] flex items-center justify-center">
      <Card className="w-1/2 max-md:w-full h-3/4 rounded-3xl flex flex-col bg-secondary text-secondary-foreground select-none">
        <CardContent className="h-3/4 flex flex-col justify-center items-center relative pt-12">
          <Avatar className="h-28 w-28 -mt-16 border-black border-4">
            <AvatarImage
              src={userData?.image}
              alt="Profile Image"
              className="object-cover"
            />
            <AvatarFallback>
              <PersonIcon className="h-full w-full" />
            </AvatarFallback>
          </Avatar>
          <Pencil
            className="absolute top-4 cursor-pointer right-4 max-md:top-8 max-md:right-8"
            onClick={() => setEditMode(true)}
          />
          <div className="mt-4 text-center text-secondary-foreground">
            {!editMode ? (
              updating ? (
                <Loading />
              ) : (
                <h1 className="text-3xl">{user.name}</h1>
              )
            ) : (
              <Input
                type="text"
                className="text-3xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <p className="text-sm">{userData?.email}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          {editMode && <Button onClick={handleSave}>Save</Button>}
        </CardFooter>
      </Card>
    </div>
  );
}

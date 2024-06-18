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
import { set } from "date-fns";

export default function Profile() {
  const { loading, userData } = useAuthClient();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState<string>("");
  const [updating, setUpating] = useState(false);

  useEffect(() => {
    const updateName = async () => {
      const user = (await getUserFromDB()).data;
      setName(user?.name!);
    };
    if (userData) updateName();
  }, [userData]);

  if (loading) return <Loading />;
  if (!userData) return null;
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
            onClick={() => {
              setEditMode(true);
            }}
          />
          <div className="mt-4 text-center text-secondary-foreground">
            {!editMode && (
              <>
                {updating && <Loading />}
                {!updating && <h1 className="text-3xl">{name}</h1>}
              </>
            )}
            {editMode && (
              <Input
                type="text"
                className="text-3xl"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            )}
            <p className="text-sm">{userData?.email}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div>
            {editMode && (
              <Button
                onClick={async () => {
                  setEditMode(false);
                  console.log("updating");
                  try {
                    setUpating(true);
                    const res = await updateName(name);
                    if (res.success)
                      toast({
                        title: "Success",
                      });
                    else
                      toast({
                        title: "Error while updating",
                      });
                  } catch (e) {
                    console.log(e);
                    toast({
                      title: "Internal Server Error",
                    });
                  }
                  setUpating(false);
                }}
              >
                save
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

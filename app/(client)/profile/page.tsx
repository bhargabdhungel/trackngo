"use client"

import useAuthClient from "@/hooks/useAuthClient"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import updateUsername from "@/app/actions/user/updateUsername";

export default function Profile() {
    const { userData } = useAuthClient();
    console.log(userData);
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        if (userData) {
            setUsername(userData.name!);
        }
    }, [userData]);

    async function handleUpdate () {
        if(userData) {
            const response = await updateUsername(userData.userId!, username);
            console.log(response);
        }
    }

    return (
        <>
            <div className="w-full px-5">
                <div className="bg-white sm:h-40 h-32 mt-2 rounded-md"></div>
            </div>

            <div className="justify-center flex">
                <Avatar className="h-28 w-28 -mt-16 border-black border-4">
                    <AvatarImage src={userData?.image} alt="Profile Image" className="object-cover" />
                    <AvatarFallback></AvatarFallback>
                </Avatar>
            </div>

            <div className="mt-8 text-center">
                <div className="flex flex-col justify-center items-center">
                    <Input
                        value={username}
                        className="sm:text-3xl text-xl font-semibold w-4/5 text-center border-none"
                        onChange={(e) => { setUsername(e.target.value) }}
                    />
                    <Input
                        value={userData?.email}
                        className="sm:text-md text-sm font-semibold sm:w-2/3 w-4/5 text-center mt-5 border-none"
                    />
                    <Button className="mt-5" onClick={handleUpdate}>
                        Update
                    </Button>
                </div>
            </div>
        </>
    )
}
"use client"

import useAuthClient from "@/hooks/useAuthClient"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import updateUsername from "@/app/actions/user/updateUsername";
import getUserFromDB from "@/app/actions/user/getUser";
import useFetchData from "@/hooks/useFetchData";

interface UserData {
    userId: number;
    name: string;
    email: string;
    image: string | null;
    paid: boolean;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}


export default function Profile() {
    const { userData } = useAuthClient();
    const [loading, setLoading] = useState<boolean>(false);
    const [shouldRun, setShouldRun] = useState<boolean>(false);
    const [user, setUser] = useState<UserData | null>(null);
    const [username, setUsername] = useState<string>('');
    const id = userData?.userId!;

    useFetchData(shouldRun, setUser, getUserFromDB, setLoading, { id });

    async function handleUpdate() {
        if (userData) {
            await updateUsername(userData.userId!, username);
            setShouldRun(true);
        }
    }

    useEffect(() => {
        if(!user) {
            setShouldRun(true);
        } else {
            setShouldRun(false);
            setUsername(user.name);
        }
    }, [setShouldRun, user])

    return (
        <>
            <div className="w-full px-20">
                <div className="sm:h-40 h-32 mt-2 rounded-md bg-foreground"></div>
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
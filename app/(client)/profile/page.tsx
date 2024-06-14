"use client"

import useAuthClient from "@/hooks/useAuthClient"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Profile() {
    const { userData } = useAuthClient();

    return (
        <>
            <div className="w-full px-5">
                <div className="bg-white sm:h-40 h-32 mt-2 rounded-md"></div>
            </div>

            <div className="justify-center flex">
                <Avatar className="h-28 w-28 -mt-16 border-black border-4">
                    <AvatarImage src={userData?.image} alt="Profile Image" className="object-cover" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            </div>

            <div className="mt-8 text-center">
                <div className="flex flex-col justify-center items-center">
                    <Input
                        value={userData?.name}
                        className="text-3xl font-semibold w-1/2 text-center border-none"
                    />
                    <Input
                        value={userData?.email}
                        className="sm:text-md text-sm font-semibold w-2/3 sm-w-full sm:mx-10 mx-0 text-center mt-5"
                    />
                    <Button className="mt-5">
                        Update
                    </Button>
                </div>
            </div>
        </>
    )
}
"use client";
import { userAtom } from "@/atoms/user";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import useAuthClient from "@/hooks/useAuthClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function HomePage() {
  const { loading, userData } = useAuthClient();
  const [user, setUser] = useRecoilState(userAtom);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (userData) setUser(userData);
      else router.replace("/");
    }
  }, [loading, router, setUser, userData]);

  if (loading) return <Loading />;

  return (
    <div className="flex justify-center items-center h-full">
      <div>
        <h1>Welcome to TrackNGo! {user?.name}</h1>
        <p>Here are the buses:</p>
        <Link href="/vehicle">
          <Button>View Vehicles</Button>
        </Link>
        <Link href="/driver">
          <Button>View Drivers</Button>
        </Link>
      </div>
    </div>
  );
}

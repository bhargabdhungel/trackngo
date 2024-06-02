"use client";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import useAuthClient from "@/hooks/useAuthClient";
import Link from "next/link";

export default function HomePage() {
  const { loading, userData } = useAuthClient();

  if (loading) return <Loading />;

  return (
    <div className="flex justify-center items-center h-full">
      <div>
        <h1>Welcome to TrackNGo! {userData?.name}</h1>
        <p>Here are the buses:</p>
        <div className="flex space-x-4">
          <Link href="/vehicle">
            <Button>View Vehicles</Button>
          </Link>
          <Link href="/driver">
            <Button>View Drivers</Button>
          </Link>
          <Link href="/trip">
            <Button>View Trips</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

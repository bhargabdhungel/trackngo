"use client";
import { redirect } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function HomePage(): JSX.Element {
  const { loading, user, signIn, signOut } = useAuth();

  if (!loading && user) {
    redirect("/home");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight animate-scaleUp">
          TrackNGo
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6 animate-moveUp">
          Easy and Fast Tracking of Vehicles
        </p>
        {!loading && (
          <Button onClick={signIn} className="mt-8">
            Sign In with Google
          </Button>
        )}
      </div>
    </div>
  );
}

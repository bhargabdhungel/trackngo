"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export default function ButtonSignIn(): JSX.Element {
  return (
    <Button onClick={() => signIn("google")} className="mt-6">
      Sign In with Google
    </Button>
  );
}

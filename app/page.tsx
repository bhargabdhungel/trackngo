import ButtonSignIn from "@/components/buttons/SignIn";
import { authOptions } from "@/lib/auth";
import { User } from "@/lib/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (user) redirect("/home");
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight animate-scaleUp">
          TrackNGo
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6 animate-moveUp">
          Easy and Fast Tracking of Vehicles
        </p>
        <ButtonSignIn />
      </div>
    </div>
  );
}

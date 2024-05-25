import getAll from "@/app/actions/bus/getAll";
import isPaidUser from "@/app/actions/user/isPaid";
import { Button } from "@/components/ui/button";
import getUserServer from "@/hooks/useAuthServer";
import Link from "next/link";

export default async function HomePage(): Promise<JSX.Element> {
  const user = await getUserServer();
  const paid = await isPaidUser();
  return (
    <div className="flex justify-center items-center h-full">
      <div>
        <h1>Welcome to TrackNGo! {user.name}</h1>
        <p>Here are the buses:</p>
        <p>{paid ? "Paid" : "Not paid"} User</p>
        <Link href="/vehicle/addnew">
          <Button>Add New Vehicle</Button>
        </Link>
        <Link href="/vehicle">
          <Button>View Vehicles</Button>
        </Link>
      </div>
    </div>
  );
}

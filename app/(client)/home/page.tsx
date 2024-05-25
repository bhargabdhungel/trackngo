import getAll from "@/app/actions/bus/getAll";
import isPaidUser from "@/app/actions/user/isPaid";
import getUserServer from "@/hooks/useAuthServer";

export default async function HomePage(): Promise<JSX.Element> {
  const user = await getUserServer();
  const paid = await isPaidUser();
  const result = await getAll();
  console.log(result);
  return (
    <div className="flex justify-center items-center h-full">
      <div>
        <h1>Welcome to TrackNGo! {user.name}</h1>
        <p>Here are the buses:</p>
        <p>{paid ? "Paid" : "Not paid"} User</p>
      </div>
    </div>
  );
}

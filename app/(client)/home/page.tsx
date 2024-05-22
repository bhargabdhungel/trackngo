import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function HomePage(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);
  const user = session?.user?.name;
  return (
    <div className="flex justify-center items-center h-full">
      <div>
        <h1>Welcome to TrackNGo, {user ? user : "hackerman"}!</h1>
      </div>
    </div>
  );
}

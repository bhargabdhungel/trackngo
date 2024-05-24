import getUserServer from "@/hooks/useAuthServer";

export default async function HomePage(): Promise<JSX.Element> {
  const user = await getUserServer();
  return (
    <div className="flex justify-center items-center h-full">
      <div>
        <h1>Welcome to TrackNGo! {user.name}</h1>
        <p>Here are the buses:</p>
      </div>
    </div>
  );
}

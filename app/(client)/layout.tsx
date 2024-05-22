import AppBar from "@/components/appbar";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "TrackNGo",
  description: "Easy and Fast Tracking of Vehicles",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col">
      <AppBar />
      <div className="grow">{children}</div>
    </div>
  );
}

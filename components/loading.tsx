"use client"

import { useTheme } from "next-themes";
import { BallTriangle } from "react-loading-icons";

export default function Loading() {
  const theme = useTheme().theme;
  const stroke = theme == "dark" ? "white" : "black";

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div>
        <BallTriangle stroke={stroke} />
      </div>
    </div>
  );
}

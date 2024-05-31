"use client"

import { loadingAtom } from "@/atoms/loading";
import { BallTriangle } from "react-loading-icons";
import { useRecoilValue } from "recoil";

export default function Loading() {
  const loading = useRecoilValue(loadingAtom)

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div>
        <BallTriangle stroke={loading!} />
      </div>
    </div>
  );
}

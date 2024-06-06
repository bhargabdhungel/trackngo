"use client";
import { usePathname, useRouter } from "next/navigation";
import getVehicleWithId from "@/app/actions/vehicle/get";
import { useEffect, useState } from "react";
import { Vehicle } from "@/lib/types";

import useFetchData from "@/hooks/useFetchData";
import Loading from "@/components/loading";
import { useRecoilState } from "recoil";
import { vehiclesAtom } from "@/atoms/vehicle";
import { Button } from "@/components/ui/button";
import getAllVehicles from "@/app/actions/vehicle/getAll";

export default function VehicleWithId() {
  const path = usePathname();
  const id = parseInt(path.split("/").pop() as string, 10);
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [vehicles, setVehicles] = useRecoilState(vehiclesAtom);
  const shouldRun = vehicles ? false : true;
  useFetchData(shouldRun, setVehicles, getAllVehicles, setLoading);
  const vehicle = vehicles?.find(
    (vehicle) => vehicle.id === id && vehicle.documents
  );

  if (loading) return <Loading />;

  return (
    <div className="h-full flex flex-col pt-12 items-center">
      <h2 className="scroll-m-20 border-b pb-12 text-3xl font-semibold tracking-tight first:mt-0">
        {vehicle?.name}
      </h2>
      <h3 className="text-xl font-semibold tracking-tight">Documents</h3>
      <div className="flex flex-col items-center">
        {vehicle?.documents?.map((document) => (
          <div key={document.id} className="flex items-center">
            <p className="text-lg font-semibold tracking-tight">
              {document.type}
            </p>
          </div>
        ))}
      </div>
      <Button
        onClick={() => {
          router.push(`/vehicle/${id}/upload`);
        }}
      >
        Upload
      </Button>
    </div>
  );
}

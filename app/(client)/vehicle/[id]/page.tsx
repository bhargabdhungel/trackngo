"use client";
import { usePathname, useRouter } from "next/navigation";
import getVehicleWithId from "@/app/actions/vehicle/get";
import { useEffect, useState } from "react";
import { Vehicle } from "@/lib/types";

import useFetchData from "@/hooks/useFetchData";
import Loading from "@/components/loading";
import { useRecoilState } from "recoil";
import { vehiclesAtom } from "@/atoms/vehicle";

export default function VehicleWithId() {
  const path = usePathname();
  const id = parseInt(path.split("/").pop() as string, 10);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [vehicles, setVehicles] = useRecoilState(vehiclesAtom);

  const vehicle = vehicles?.find(
    (vehicle) => vehicle.id === id && vehicle.documents
  );

  const run = () => {
    if (!vehicles) return false;
    const vehicleDocumentsExists = vehicles.some(
      (vehicle) => vehicle.id === id && vehicle.documents
    );
    if (!vehicleDocumentsExists) return true;
    return false;
  };
  const shouldRun = run();

  const setVehiclesWithId = (vehicle: Vehicle | null) => {
    if (!vehicle) return;
    setVehicles((vehicles) => {
      if (!vehicles) return [vehicle];
      const newVehicles = vehicles.map((v) => {
        if (v.id === vehicle.id) return vehicle;
        return v;
      });
      return newVehicles;
    });
  };

  useFetchData(shouldRun, setVehiclesWithId, getVehicleWithId, setLoading, id);

  if (!vehicles) return router.push("/vehicle");
  if (loading || !vehicle) return <Loading />;

  return (
    <div className="flex justify-center h-full">
      <div className="h-1/4 flex flex-col pt-12 items-center">
        <h2 className="scroll-m-20 border-b pb-12 text-3xl font-semibold tracking-tight first:mt-0">
          {vehicle.name}
        </h2>
        <h3 className="text-xl font-semibold tracking-tight">Documents</h3>
        <div className="flex flex-col items-center">
          {vehicle.documents?.map((document) => (
            <div key={document.id} className="flex items-center">
              <p className="text-lg font-semibold tracking-tight">
                {document.type}
              </p>
            </div>
          ))}
        </div>

        {/* <InputFile /> */}
      </div>
    </div>
  );
}

"use client";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import getAllVehicles from "@/app/actions/vehicle/getAll";
import { DocumentList } from "@/components/Document/Document";
import useData from "@/hooks/useData";

export default function VehicleWithId() {
  const path = usePathname();
  const id = parseInt(path.split("/").pop() as string, 10);
  const router = useRouter();

  const { data: vehicles, isLoading } = useData(
    getAllVehicles,
    "getAllVehicles"
  );

  const vehicle = useMemo(
    () => vehicles?.find((v) => v.id === id),
    [vehicles, id]
  );

  if (isLoading) return <Loading />;

  return (
    <>
      <p className="text-center sm:text-4xl text-xl font-semibold mt-10 mx-20">
        Details
      </p>

      <hr className="border-t-2 border-gray-300 mx-20 mt-1" />

      <p className="sm:text-3xl text-2xl font-semibold mt-10 mx-20">Name</p>
      <hr className="border-t-2 border-gray-300 mx-20 mt-1 sm:w-1/2" />
      <p className="sm:text-2xl text-lg font-semibold mt-1 mx-20 text-gray-400 hover:underline">
        {vehicle?.name}
      </p>

      <div className="mt-10">
        <p className="mx-20 sm:text-3xl text-2xl font-semibold mb-2">
          Documents
        </p>
        <hr className="border-t-2 border-gray-500 mx-20 mt-2 mb-10" />
        {vehicle?.documents && <DocumentList documents={vehicle.documents} />}
      </div>

      {/* --------------------- */}

      <div className="h-full flex flex-col pt-12 items-center">
        <Button
          onClick={() => {
            router.push(`/vehicles/${id}/upload`);
          }}
        >
          Upload
        </Button>
      </div>
    </>
  );
}

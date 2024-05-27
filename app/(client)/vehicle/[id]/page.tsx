"use client";
import { usePathname } from "next/navigation";
import getVehicleWithId from "@/app/actions/vehicle/get";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Vehicle } from "@/lib/types";
import { InputFile } from "@/components/input-file";
import Image from "next/image";

export default function VehicleWithId() {
  const path = usePathname();
  const id = parseInt(path.split("/").pop() as string, 10);

  const [loading, setLoading] = useState<boolean>(true);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getVehicleWithId(id);
        if (response.success) {
          const vehicle = response.data;
          setVehicle(vehicle as Vehicle);
        } else {
          toast({
            title: response.message,
            description: response.description,
          });
        }
      } catch (e) {
        console.error(e);
        toast({
          title: "Error",
          description: "An error occurred while fetching the vehicle.",
        });
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading || !vehicle) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  return (
    <div className="flex justify-center h-full">
      <div className="h-1/4 flex flex-col pt-12 items-center">
        <h2 className="scroll-m-20 border-b pb-12 text-3xl font-semibold tracking-tight first:mt-0">
          {vehicle.name}
        </h2>
        <InputFile />
        {/* {vehicle && (
          <div className="flex flex-col items-center">
            <Image src={"fsfsfdaf"} width={200} height={200} alt="Vehicle" />
            <p className="text-lg mt-4">{vehicle.name}</p>
          </div>
        )} */}
      </div>
    </div>
  );
}

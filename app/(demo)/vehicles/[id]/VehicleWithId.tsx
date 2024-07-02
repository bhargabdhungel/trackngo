"use client";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import getAllVehicles from "@/app/actions/vehicle/getAll";
import useData from "@/hooks/useData";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import deleteVehicle from "@/app/actions/vehicle/deleteVehicle";
import { ListVehicleDocs } from "@/components/Document/ListVehicleDocs";

function DeleteVehicleById({ id }: { id: number }) {
  const router = useRouter();
  const {
    data: vehicles,
    isLoading,
    mutate,
  } = useData(getAllVehicles, "getAllVehicles");
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className="border py-2 px-4 rounded-md hover:bg-white hover:bg-opacity-10 "
        onClick={(event) => event.stopPropagation()}
      >
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            vehicle, its documents and trips.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              try {
                const response = await deleteVehicle(id);
                if (response.success) {
                  toast({
                    title: "Vehicle deleted successfully",
                  });
                  mutate({
                    success: true,
                    message: "Vehicle deleted successfully",
                    data: vehicles?.filter((vehicle) => vehicle.id !== id),
                  });
                } else {
                  toast({
                    title: response.message,
                  });
                }
              } catch (error) {
                toast({
                  title: "Server error",
                });
              } finally {
                router.replace("/vehicles");
              }
            }}
          >
            {" "}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

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
      <div className="flex items-center justify-center mt-10">
        <Card className="w-4/5 flex flex-col lg:flex-row">
          <CardContent className="w-full lg:w-1/2">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 items-center sm:justify-center">
                <div className="flex flex-col sm:ml-0 ml-3">
                  <p className="sm:text-2xl text-md sm:text-center mt-10 mb-5">{vehicle?.name}</p>
                  <div className="flex flex-col">
                    <DeleteVehicleById id={id} />
                    <Button
                      className="my-4"
                      onClick={() => {
                        router.push(`/vehicles/${id}/upload`);
                      }}
                    >
                      <p className="py-1">Upload</p>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardContent className="w-full lg:w-1/2">
            <div className="p-4">
              {vehicle?.documents && <ListVehicleDocs docs={vehicle?.documents} />}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
